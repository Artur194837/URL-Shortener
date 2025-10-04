Ein URL Shortener bei dem eine URL und eine Kürzung angegeben werden kann. Bei einem Klick auf Senden werden beide in einer SQLite3 Datenbank gespeichert. Wenn dann die Kürzung auf dem lokalen Server aufgerufen wird, wird auf die ursprüngliche URL weitergeleitet.

Builden:
docker build -t url-shortener .

Als Container starten:
docker compose up 
