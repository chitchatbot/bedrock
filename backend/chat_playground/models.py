from pydantic import BaseModel

class ChatRequest(BaseModel):
    prompt: str

class ChatResponse(BaseModel):
    completion: str

class User(BaseModel):
    username: str
    password: str