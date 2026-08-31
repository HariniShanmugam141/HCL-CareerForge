import fitz  # PyMuPDF
import re
import os

# A comprehensive list of skills to look for in resumes
KNOWN_SKILLS = [
    'Python', 'Java', 'JavaScript', 'SQL', 'HTML / CSS', 
    'Git', 'React', 'Node.js', 'Pandas', 'NumPy', 
    'Machine Learning', 'DSA', 'C++', 'C#', 'AWS',
    'Docker', 'Kubernetes', 'Azure', 'Angular', 'Vue',
    'TypeScript', 'Django', 'Flask', 'Spring Boot',
    'MongoDB', 'PostgreSQL', 'Redis', 'GraphQL',
    'Data Science', 'AI / ML', 'Cybersecurity', 'UI/UX Design',
    'Digital Marketing', 'Product Management', 'Cloud Computing',
    'TensorFlow', 'PyTorch', 'Data Structures', 'Algorithms'
]

def extract_text_from_pdf(pdf_path: str) -> str:
    """Extracts text from a PDF file using PyMuPDF."""
    text = ""
    try:
        doc = fitz.open(pdf_path)
        for page in doc:
            text += page.get_text()
        
        # If no text was extracted, it might be a scanned/image-based PDF.
        if not text.strip():
            print("No selectable text found in PDF. Attempting OCR...")
            text = perform_ocr_on_pdf(doc)
            
    except Exception as e:
        print(f"Error reading PDF: {e}")
    return text

def perform_ocr_on_pdf(doc) -> str:
    """Attempts to perform OCR on PDF images using pytesseract."""
    text = ""
    try:
        import pytesseract
        from PIL import Image
        import io
        
        for page in doc:
            image_list = page.get_images(full=True)
            for img_index, img in enumerate(image_list):
                xref = img[0]
                base_image = doc.extract_image(xref)
                image_bytes = base_image["image"]
                
                # Convert bytes to PIL Image
                image = Image.open(io.BytesIO(image_bytes))
                
                # Perform OCR
                ocr_text = pytesseract.image_to_string(image)
                text += ocr_text + "\n"
    except ImportError:
        print("pytesseract or Pillow is not installed. Skipping OCR.")
    except Exception as e:
        print(f"OCR failed. Please ensure Tesseract-OCR is installed on your system. Error: {e}")
    
    return text

def parse_resume_for_skills(file_path: str) -> list:
    """
    Parses a resume file and extracts recognized skills.
    Currently supports PDF files.
    """
    text = ""
    
    if file_path.lower().endswith('.pdf'):
        text = extract_text_from_pdf(file_path)
    elif file_path.lower().endswith(('.doc', '.docx')):
        # For simplicity, we are returning a warning, docx needs python-docx
        print("DOC/DOCX parsing requires python-docx. Defaulting to empty text for now.")
        text = ""
    
    if not text.strip():
        return []

    # Simple keyword matching for skills
    extracted_skills = set()
    text_lower = text.lower()
    
    # Normalize some text for better matching (e.g. "HTML/CSS" vs "HTML / CSS")
    text_lower = text_lower.replace("/", " / ")
    
    for skill in KNOWN_SKILLS:
        # Create a regex boundary match for the skill
        skill_lower = skill.lower()
        
        # Exact match or boundary match
        if skill_lower in text_lower:
             # Basic sanity check with regex boundaries if it's a single word
             if " " not in skill_lower and len(skill_lower) > 2:
                 pattern = r'\b' + re.escape(skill_lower) + r'\b'
                 if re.search(pattern, text_lower):
                     extracted_skills.add(skill)
             else:
                 # For multi-word skills like "Machine Learning", direct inclusion is usually safe
                 extracted_skills.add(skill)
                 
    return list(extracted_skills)

# If run directly for testing
if __name__ == "__main__":
    # sample usage: print(parse_resume_for_skills("sample_resume.pdf"))
    pass
