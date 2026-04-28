from PIL import Image, ImageOps

def create_favicon(input_path, output_path, bg_color):
    # Load image
    img = Image.open(input_path).convert("RGBA")
    
    # Calculate bounding box of the non-transparent part (to crop text if needed, or just center)
    # Assuming the user wants just the symbol. If the logo has text on the right, we need to crop.
    # Let's simple-crop the left part or just find the bbox of the symbol.
    # For this specific logo, usually symbol is left, text right.
    
    # 1. Naive crop: center square might capture symbol if it's icon-only. 
    # But often logo.png is wide (Symbol + Text).
    # Let's guess the symbol is the leftmost square-ish part.
    # We will crop the image to the bounding box of the non-transparent pixels first.
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
        
    # If width > height * 1.5, it's likely wide logo. Crop to height x height from left.
    w, h = img.size
    if w > h * 1.2:
        img = img.crop((0, 0, h, h)) # Take left square
    
    # Now we have the symbol (gradient). We want it WHITE.
    # Create a white image same size
    white_symbol = Image.new("RGBA", img.size, (255, 255, 255, 255))
    # Use the alpha channel of the original image as mask
    mask = img.split()[3]
    white_symbol.putalpha(mask)
    
    # Create background
    favicon_size = (512, 512)
    bg = Image.new("RGBA", favicon_size, bg_color)
    
    # Resize symbol to fit in background with MINIMAL padding (Maximized size)
    # User said "Too small", so we reduce padding significantly.
    padding = int(favicon_size[0] * 0.08) # Reduced from 0.2 to 0.08
    target_size = (favicon_size[0] - padding*2, favicon_size[1] - padding*2)
    
    # Maintain aspect ratio
    white_symbol.thumbnail(target_size, Image.Resampling.LANCZOS)
    
    # Ensure the white symbol is fully opaque where the mask exists
    # If the "dot" was semi-transparent in original, we want it SOLID WHITE here.
    # We can threshold the alpha channel of the white_symbol.
    r, g, b, a = white_symbol.split()
    # Any pixel with alpha > 20 becomes fully opaque (255)
    # This ensures "faint" or "glassy" parts of the logo become solid white.
    a = a.point(lambda p: 255 if p > 20 else 0)
    white_symbol.putalpha(a)
    
    # Center paste
    paste_x = (favicon_size[0] - white_symbol.width) // 2
    paste_y = (favicon_size[1] - white_symbol.height) // 2
    
    bg.paste(white_symbol, (paste_x, paste_y), white_symbol)
    
    bg.save(output_path)
    print(f"Favicon saved to {output_path}")


if __name__ == "__main__":
    # Tripsoda Main Color (Mint) from tailwind.config.js
    # Hex: #00D094 -> RGB: (0, 208, 148)
    MINT_COLOR = (0, 208, 148, 255) 
    
    create_favicon(
        "public/images/logo.png", 
        "public/favicon_mint_v2.png", 
        MINT_COLOR
    )
