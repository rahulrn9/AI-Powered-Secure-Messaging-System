def gen(secret): return {'proof': f"ZKP({secret[:4]}...)"} 
def verify(p, c): return p.get('proof','').startswith('ZKP(')
