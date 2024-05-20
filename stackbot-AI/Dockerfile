FROM python:3.10

WORKDIR /app

# Install dependencies
RUN pip install spacy
RUN python -m spacy download en_core_web_sm

# Copy and run app
COPY backendAI.py ./
COPY cert.pem ./
COPY key.pem ./

CMD [ "python3", "./backendAI.py" ]
