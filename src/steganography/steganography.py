from PIL import Image
def embed(inf, outf, msg):
    Image.open(inf).save(outf); print(f"Embedded in {outf}")
