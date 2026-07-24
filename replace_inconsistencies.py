import os
import re

docs_dir = 'docs'
for filename in os.listdir(docs_dir):
    if not filename.endswith('.md'): continue
    filepath = os.path.join(docs_dir, filename)
    with open(filepath, 'r') as f:
        content = f.read()

    # Replacements
    content = re.sub(r'\bRiverpod\b', 'Zustand', content)
    content = re.sub(r'\briverpod\b', 'zustand', content)
    
    content = re.sub(r'\bDart\b', 'TypeScript', content)
    content = re.sub(r'\bdart\b', 'typescript', content)
    
    content = re.sub(r'\bWidget\b', 'Component', content)
    content = re.sub(r'\bwidget\b', 'component', content)
    content = re.sub(r'\bWidgets\b', 'Components', content)
    content = re.sub(r'\bwidgets\b', 'components', content)

    with open(filepath, 'w') as f:
        f.write(content)

print("Done replacing inconsistencies")
