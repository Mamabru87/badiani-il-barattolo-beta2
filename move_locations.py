import re

# Read the HTML file
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern for the locations block
locations_pattern = r'(<div class="section-divider-data" data-section="locations"[^>]*></div>\s*<section id="locations" class="global-presence">\s*<img[^>]*>\s*</section>)'

# Find the locations block
locations_match = re.search(locations_pattern, content, re.DOTALL)
if locations_match:
    locations_block = locations_match.group(1)
    print("Found locations block")

    # Remove the locations block from its current position
    content = re.sub(locations_pattern, '', content, flags=re.DOTALL)

    # Find the why section
    why_pattern = r'(<div class="section-divider-data" data-section="why"[^>]*></div>\s*<div class="section-divider visible">\s*<p>Heritage[^<]*</p>\s*</div>\s*<section id="why" class="why">)'
    why_match = re.search(why_pattern, content, re.DOTALL)
    if why_match:
        # Insert the locations block before the why section
        content = content.replace(why_match.group(1), locations_block + '\n\n' + why_match.group(1))
        print("Moved locations block before why")

        # Write back to file
        with open('index.html', 'r', encoding='utf-8') as f:
            f.write(content)
        print("File updated")
    else:
        print("Why section not found")
else:
    print("Locations block not found")