from django.shortcuts import render


LISTINGS = [
    {
        "id": 1, "title": "პანორამული სტუდიო ზღვის ხედით", "district": "ორბი თაუერსი",
        "district_key": "orbi", "type": "ბინა / აპარტამენტი", "type_key": "apartment",
        "deal": "buy", "area": 33, "rooms": "სტუდიო", "floor": "28 / 45",
        "price": 49500, "price_label": "$49,500", "roi": 13.8, "image": "photo-1600607687939-ce8a6c25118c",
        "tags": ["sea", "turnkey"], "badge": "ზღვის ხედი", "featured": True,
    },
    {
        "id": 2, "title": "თანამედროვე ბინა ახალ ბულვარში", "district": "ახალი ბულვარი",
        "district_key": "boulevard", "type": "ბინა / აპარტამენტი", "type_key": "apartment",
        "deal": "buy", "area": 68, "rooms": "2 საძინებელი", "floor": "12 / 18",
        "price": 89000, "price_label": "$89,000", "roi": 11.2, "image": "photo-1600210492486-724fe5c67fb0",
        "tags": ["installment"], "badge": "შიდა განვადება", "featured": False,
    },
    {
        "id": 3, "title": "ვილა აუზით გონიოში", "district": "გონიო / კვარიათი",
        "district_key": "gonio", "type": "ვილა / სახლი", "type_key": "house",
        "deal": "buy", "area": 210, "rooms": "3 საძინებელი", "floor": "1–2 / 2",
        "price": 245000, "price_label": "$245,000", "roi": 9.5, "image": "photo-1613490493576-7fde63acd811",
        "tags": ["sea", "turnkey"], "badge": "პრემიუმი", "featured": False,
    },
    {
        "id": 4, "title": "ბინა ძველი ბათუმის ხედებით", "district": "ძველი ბათუმი",
        "district_key": "old-town", "type": "ბინა / აპარტამენტი", "type_key": "apartment",
        "deal": "rent", "area": 52, "rooms": "1 საძინებელი", "floor": "5 / 8",
        "price": 700, "price_label": "$700 / თვე", "roi": 0, "image": "photo-1600566753086-00f18fb6b3ea",
        "tags": ["turnkey"], "badge": "გრძელვადიანი", "featured": False,
    },
    {
        "id": 5, "title": "კომერციული ფართი ბათუმი მოლთან", "district": "ძველი ბათუმი",
        "district_key": "old-town", "type": "კომერციული", "type_key": "commercial",
        "deal": "buy", "area": 120, "rooms": "ღია სივრცე", "floor": "1 / 10",
        "price": 185000, "price_label": "$185,000", "roi": 14.2, "image": "photo-1497366754035-f200968a6e72",
        "tags": ["turnkey"], "badge": "მაღალი ROI", "featured": True,
    },
    {
        "id": 6, "title": "სტუდიო პირველ ზოლში", "district": "მახინჯაური / ჩაქვი",
        "district_key": "makhinjauri", "type": "ბინა / აპარტამენტი", "type_key": "apartment",
        "deal": "buy", "area": 38, "rooms": "სტუდიო", "floor": "9 / 22",
        "price": 42000, "price_label": "$42,000", "roi": 12.5, "image": "photo-1600607687920-4e2a09cf159d",
        "tags": ["sea", "installment"], "badge": "ზღვის ხედი", "featured": False,
    },
]


def home(request):
    return render(request, "properties/home.html", {"listings": LISTINGS})
