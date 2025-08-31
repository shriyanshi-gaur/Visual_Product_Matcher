# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Copy and install requirements as the root user
COPY ./requirements.txt requirements.txt
RUN pip install --no-cache-dir --upgrade -r requirements.txt

# Copy the rest of the application's code
COPY . /app

# Run the preprocessing script as the root user to download the model
RUN python preprocess.py

# Now, create and switch to a non-root user for running the app
RUN useradd -m -u 1000 user
USER user

# Run uvicorn when the container launches
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]