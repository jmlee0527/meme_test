from pathlib import Path
from PIL import Image

OUTPUT = Path(__file__).resolve().parents[1] / "public" / "images" / "food-worldcup"
OUTPUT.mkdir(parents=True, exist_ok=True)

SPRITES = [
    (
        Path("/Users/jungmin/.codex/generated_images/019f25de-1f22-72b0-a7a7-c697ad893b51/exec-11944026-17d7-47e4-b093-79857b71787d.png"),
        ["chicken", "seasoned-chicken", "fried-chicken", "pizza", "hamburger", "tteokbokki", "malatang", "jokbal"],
    ),
    (
        Path("/Users/jungmin/.codex/generated_images/019f25de-1f22-72b0-a7a7-c697ad893b51/exec-5c36c6ce-40e7-4dd5-af29-155c076d058b.png"),
        ["bossam", "samgyeopsal", "gopchang", "chicken-feet", "kimchi-stew", "budae-stew", "spicy-pork", "tonkatsu"],
    ),
    (
        Path("/Users/jungmin/.codex/generated_images/019f25de-1f22-72b0-a7a7-c697ad893b51/exec-67f4fd76-1647-4078-baed-e001cc152dd2.png"),
        ["sushi", "sashimi", "salmon-bowl", "pho", "jjajangmyeon", "jjamppong", "tangsuyuk", "mala-xiang-guo"],
    ),
    (
        Path("/Users/jungmin/.codex/generated_images/019f25de-1f22-72b0-a7a7-c697ad893b51/exec-e69eaafc-ba79-4b5f-a2c5-1559e3b549cd.png"),
        ["chinese-cold-noodles", "naengmyeon", "gukbap", "seolleongtang", "gamjatang", "sandwich", "salad", "cream-pasta"],
    ),
]

for sprite_path, names in SPRITES:
    with Image.open(sprite_path) as sprite:
        width, height = sprite.size
        for index, name in enumerate(names):
            column, row = index % 4, index // 4
            left = round(column * width / 4) + 2
            top = round(row * height / 2) + 2
            right = round((column + 1) * width / 4) - 2
            bottom = round((row + 1) * height / 2) - 2
            image = sprite.crop((left, top, right, bottom)).resize((640, 640), Image.Resampling.LANCZOS)
            image.save(OUTPUT / f"{name}.webp", "WEBP", quality=86, method=6)

print(f"Created {len(list(OUTPUT.glob('*.webp')))} food images in {OUTPUT}")
