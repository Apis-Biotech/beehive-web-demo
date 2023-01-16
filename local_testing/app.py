import requests
import json
import time

with open("local_testing/new.json", "r") as f:
    line_data = f.readlines()

for line in line_data:

    data = json.loads(line.strip())

    resp = requests.post("http://bees.eugene-dev.com/api/submit-data", json=data)

    print(resp.text)
    time.sleep(1)