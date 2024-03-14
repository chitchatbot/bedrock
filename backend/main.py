import uvicorn

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from chat_playground.services import database
import config
from chat_playground.routes import router as chat_playground_router
# This is a comment to trigger the CI/CD workflow

app = FastAPI()

app.include_router(chat_playground_router)

@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

app.add_middleware(
    CORSMiddleware,
    allow_origins=config.ALLOWED_CORS_ORIGINS,
    allow_methods=config.ALLOWED_CORS_METHODS,
    allow_headers=config.ALLOWED_CORS_HEADERS
)

if __name__ == "__main__":
    uvicorn.run("main:app", host=config.HOST, port=config.PORT, log_level="info")
