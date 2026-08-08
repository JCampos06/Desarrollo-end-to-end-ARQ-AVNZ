# syntax=docker/dockerfile:1

# One-shot batch job: scrapes exito.com with headless Chromium/Selenium and
# posts the results to the api service. Not a long-running server.
FROM python:3.12.5-slim-bookworm

# Debian's chromium / chromium-driver packages are built and versioned
# together, so apt guarantees a matching browser + driver pair (KISS: no
# manual chromedriver version pinning/downloading needed).
RUN apt-get update && apt-get install -y --no-install-recommends \
        chromium \
        chromium-driver \
    && rm -rf /var/lib/apt/lists/*

ENV CHROME_BIN=/usr/bin/chromium \
    CHROMEDRIVER_PATH=/usr/bin/chromedriver \
    PYTHONUNBUFFERED=1

WORKDIR /app

# Dependencies change less often than source: install them first so this
# layer is cached across scraper.py edits.
COPY requeriments.txt ./
RUN pip install --no-cache-dir -r requeriments.txt

COPY scripts/scraper.py ./scraper.py

# Chromium's own sandbox is disabled via --no-sandbox in scraper.py, so it
# can run as a non-root user without needing extra Linux capabilities.
RUN useradd --create-home --uid 1000 scraper
USER scraper

CMD ["python", "scraper.py"]
