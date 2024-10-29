def Create(db):
    db.write()
    
def Read(db, id):
    return db.read(id)
    
def ReadAll(db):
    return db.read()

def Update(db, id):
    db.update(id)
    
def Delete(db, id):
    db.delete()