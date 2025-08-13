from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware # Import the content router
from routes.c import router as content_router  # Import the content router
from routes.d import router as d_router  # Import the d router

app = FastAPI()

# Enable CORS for all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)
# Include the content router
app.include_router(content_router)
# Include the d router
app.include_router(d_router)
@app.get("/")
async def root():
    return {"message": "Welcome to AI Content Creator"}