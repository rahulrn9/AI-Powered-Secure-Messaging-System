import boto3
s3 = boto3.client('s3')
def backup(bucket, key, data):
    s3.put_object(Bucket=bucket, Key=key, Body=data); print(f"Backed up {key}")
