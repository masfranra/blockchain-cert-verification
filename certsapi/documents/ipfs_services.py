import ipfshttpclient
from django.conf import settings

def connect_to_ipfs():
    auth = f"{settings.INFURA_PROJECT_ID}:{settings.INFURA_PROJECT_SECRET}"
    client = ipfshttpclient.connect(f"/dns/ipfs.infura.io/tcp/5001/https", auth=auth)
    return client

def upload_file_to_ipfs(file):
    client = connect_to_ipfs()
    result = client.add(file)
    return result['Hash']  # CID of the uploaded file

def retrieve_file_from_ipfs(cid):
    client = connect_to_ipfs()
    result = client.cat(cid)
    return result  # Returns file content as bytes
