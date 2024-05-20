from http.server import BaseHTTPRequestHandler, HTTPServer
import ssl
import spacy
import re
import json
import requests

backend_url = "http://13.51.249.39/"

class RequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        # Set response status code
        self.send_response(200)
        # Set response headers
        self.send_header('Content-type', 'text/plain')
        self.end_headers()
        # Get the request body
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data.decode('utf-8'))
        text = data.get('text')
        jwt_token = data.get('token')
        bodyText = process_message(text,jwt_token)
        body = bodyText.encode('utf-8')
        # Echo the received text back in the response
        self.wfile.write(body)

def process_message(message,jwt_token):
    # Load the English NLP model from spaCy
    nlp = spacy.load("en_core_web_sm")
    doc = nlp(message)

    # Initialize variables to store extracted entities
    store_name = None
    item = None
    q = None
    root = None
    # Extract entities from the parsed message
    for token in doc:
        print(token.dep_,token.head.text,token.text,token.pos_,token.lemma_)
        if token.dep_ == "pobj" or token.dep_ == "dobj" and (token.head.text == "in" or token.head.text == "to" or token.head.text == "into"):
            store_name = token.text
        if token.dep_ == "dobj" or token.dep_ == "pobj" and (token.head.text == "add" or token.head.text == "put" or token.head.text == "place"):
            item = token.text
        if token.dep_ == "pobj" and token.head.text == "from":
            store_name = token.text
        if token.dep_ == "dobj" and (token.head.text == "remove" or token.head.text == "delete" or token.head.text == "erase"):
            item = token.text
        if token.like_num:
            q = token.text
        if token.dep_ == "ROOT":
            root = token.text
        
    print(item, store_name, q)

    #Determine the action based on the parsed message
    if  re.search(r"(how many|number of) (item|product|thing)s? (are|in)", message.lower()) and store_name:
        # Case 1: How many items are in the store <store_name>
        print("Case 1 How many items are in the store " , store_name)
        return case1(store_name,jwt_token)
    elif re.search(r"(add|put|place)(.*?) (to|in|into)", message.lower()) and item and store_name:
        # Case 2: Add item <item> to the store <store_name>
        print("Case 2: Add item:", item," to the store:", store_name, "quantity:",q)
        return case2(item,store_name,q,jwt_token)
    elif re.search(r"(delete|remove|erase)(.*?) (from|out of)", message.lower()) and store_name:
        #Case 3: Remove item <item> from store <store_name>
        if item:
            print("Case 3: Remove item:", item," from the store:", store_name, "quantity:",q)
            return case3(item,store_name,q,jwt_token)
        elif root:
            print("Case 3: Remove item:", root," from the store:", store_name, "quantity:",q)
            return case3(root,store_name,q,jwt_token)
    elif re.search(r"(all|every)(.*?) (item|product|thing)s? in", message.lower()):
        # Case 4: Display all items in <store_name>
        print("Case 4: Display all items")
        return case4(store_name,jwt_token)
    else:
        print("Ask again")
        return "The command was not clear. The options are to: add an item to a specific store, delete an item from a specific store, or ask to display all items in a specific store or to display the number of items"

    print(doc)


def case1(store_name,jwt_token):
    headers = {
        'accept': '*/*',
        'Authorization': 'Bearer ' + jwt_token
    }
    try:
        response = requests.get(backend_url+"api/items/items/"+store_name, headers=headers)
        if response.status_code == 200:
            print("GET request successful!")
            print("Response:")
            print(response.json())  # Assuming the response is JSON
            data = response.json()
            count=0
            for x in data:
                if x['count']==0:
                    count=count+1
                else:
                    count=count+x['count']
            return f"There are {count} items in the store {store_name}" #return f"Case 1 How many items are in the store {store_name} {count}"
        else:
            print("GET request failed with status code:", response.status_code)
            if response.status_code == 401:
                return "The user is not logged in"
            else:
                return f"There is no store with the name {store_name}"
    except Exception as e:
        print("An error occurred:", str(e))
    
def case2(item, store_name, q, jwt_token):
    if q==None:
        q=1
    headers = {
        'accept': '*/*',
        'Authorization': 'Bearer ' + jwt_token,
        'Content-Type': 'application/json'
    }
    data = {
        "name": item,
        "count": q,
        "description": "Added by voice command",
        "storageName": store_name,
        "expirationDate": None,
        "warrantyDate": None
    }
    
    try:
        response = requests.post(backend_url+"api/items", headers=headers, json=data)
        if response.status_code == 200:
            print("POST request successful!")
            return f"The item {item} was added in the store {store_name} in quantity of {q}" #return f"Case 2: Add item: {item} to the store: {store_name} quantity: {q}"
        else:
            print("POST request failed with status code:", response.status_code)
            if response.status_code == 401:
                return "The user is not logged in"
            elif response.status_code == 404:
                return f"There is no store with the name {store_name}"
            else:
                return f"There already exists an item with the name {item}"
    except Exception as e:
        print("An error occurred:", str(e))
    
def case3(item, store_name, q,jwt_token):
    headers = {
        'accept': '*/*',
        'Authorization': 'Bearer ' + jwt_token
    }
    try:
        response = requests.delete(backend_url+"api/items/"+item, headers=headers)
        if response.status_code == 204:
            print("DELETE request successful!")
            return f"The item {item} was removed" #return f"Case 3: Remove item: {item} from the store: {store_name} quantity:{q}"
        else:
            print("DELETE request failed with status code:", response.status_code)
            if response.status_code == 401:
                return "The user is not logged in"
            else:
                return f"There are no items called {item}"
    except Exception as e:
        print("An error occurred:", str(e))
    
def case4(store_name,jwt_token):
    headers = {
        'accept': '*/*',
        'Authorization': 'Bearer ' + jwt_token
    }
    try:
        response = requests.get(backend_url+"api/items/items/"+store_name, headers=headers)
        if response.status_code == 200:
            print("GET request successful!")
            print("Response:")
            print(response.json())  # Assuming the response is JSON
            data = response.json()
            names = []
            for x in data:
                names.append(x['name'])
            return f"The store {store_name} contains the following items: {names}" #return f"Case 4: Display all items in {store_name} {names}"
        else:
            print("GET request failed with status code:", response.status_code)
            if response.status_code == 401:
                return "The user is not logged in"
            else:
                return f"There is no store with the name {store_name}"
    except Exception as e:
        print("An error occurred:", str(e))

def run_server():
    # Set up server settings
    server_address = ('0.0.0.0', 8443)  # Customize port and host if needed
    httpd = HTTPServer(server_address, RequestHandler)

    # Load SSL certificate and key
    # certfile = './cert.pem'  # Update with your certificate file path
    # keyfile = './key.pem'     # Update with your private key file path

    # Start the server with SSL/TLS support
    # httpd.socket = ssl.wrap_socket(httpd.socket, certfile=certfile, keyfile=keyfile, server_side=True)

    print('Starting server...')
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    httpd.server_close()
    print('Server stopped.')


if __name__ == '__main__':
    run_server()
