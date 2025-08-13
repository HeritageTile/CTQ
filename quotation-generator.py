import json
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image, PageBreak
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.lib import colors
import os

def draw_header(canvas, doc):
    """
    Draws the static header for the PDF document.
    """
    canvas.saveState()

    # -- Header Dimensions and Position --
    header_height = 0.5 * inch
    header_width = doc.width
    x = doc.leftMargin
    y_bar = doc.height + doc.topMargin - header_height

    # -- Draw the Black Background Rectangle --
    canvas.setFillColor(colors.black)
    canvas.rect(x, y_bar, header_width, header_height, fill=1, stroke=0)

    # -- Draw the Top Line of Text (Centered) --
    canvas.setFillColor(colors.white)
    canvas.setFont('Helvetica-Bold', 18)
    text_line1 = "Subway Ceramics Consultation"
    center_x = x + (header_width / 2)
    text_y1 = y_bar + (header_height / 2) - 7
    canvas.drawCentredString(center_x, text_y1, text_line1)

    canvas.restoreState()

def create_pdf_from_json(json_data, output_filename):
    """
    Creates a PDF document from a nested JSON object, with a header
    and categorized sections.

    Args:
        json_data (str or dict): The JSON data. Can be a JSON string
                                 or a pre-parsed Python dictionary.
        output_filename (str): The name of the PDF file to create.
    """
    # --- 1. Process the JSON Input ---
    if isinstance(json_data, str):
        try:
            data_dict = json.loads(json_data)
        except json.JSONDecodeError:
            print("Error: Invalid JSON string provided.")
            return
    else:
        # Assume it's already a Python dictionary
        data_dict = json_data

    # --- 2. Setup the PDF Document ---
    # We leave more space at the top for our custom header
    doc = SimpleDocTemplate(output_filename, topMargin=1.5 * inch)
    styles = getSampleStyleSheet()
    story = []

    print("Starting PDF creation...")

    # --- 3. Iterate Through Categories and Items ---
    # The main loop now iterates through the keys (categories) of the dictionary.
    for category_name, items_list in data_dict.items():
        # Add the category name as a major heading (e.g., "Inspiration")
        # The category name replaces underscores with spaces for better readability.
        p_category = Paragraph(category_name.replace('_', ' '), styles['h1'])
        story.append(p_category)
        story.append(Spacer(1, 0.2 * inch))

        # Loop through each item in the category's list
        for item in items_list:
            name = item.get("name", "Unnamed Item")
            description = item.get("description")  # Get the optional description
            src = item.get("src")

            if not src:
                print(f"Skipping item '{name}' in '{category_name}' due to missing 'src'.")
                continue

            # Add the item name with a smaller font (h3 style)
            p_item = Paragraph(name, styles['h3'])
            story.append(p_item)
            story.append(Spacer(1, 0.1 * inch))

            # --- IMPORTANT: File Path Handling ---
            # This uses the 'src' path directly, assuming the script is run
            # from a directory that contains the 'src' folder.
            image_path = src

            if not os.path.exists(image_path):
                print(f"Warning: Image not found at path: {image_path}. Skipping.")
                continue

            # Add the image, scaled to fit
            img = Image(image_path, width=3*inch, height=3*inch, kind='proportional')
            story.append(img)

            story.append(Spacer(1, 0.4 * inch))
            if description:
                story.append(Spacer(1, 0.2 * inch))  # Add space between image and text
                p_desc = Paragraph(description, styles['Normal'])
                story.append(p_desc)
                print(f"Added description for '{name}'.")

            print(f"Added '{name}' from category '{category_name}' to the PDF.")

        # Add a page break after each category for clean separation
        story.append(PageBreak())


    # --- 4. Build the PDF with the Header ---
    if not story:
        print("No content was added. PDF will not be generated.")
        return

    # The 'onFirstPage' and 'onLaterPages' arguments apply our header function
    # to every page of the document.
    try:
        # We remove the last PageBreak to avoid a blank page at the end
        if isinstance(story[-1], PageBreak):
            story.pop()
        doc.build(story, onFirstPage=draw_header, onLaterPages=draw_header)
        print(f"Successfully created the PDF: {output_filename}")
    except Exception as e:
        print(f"An error occurred during PDF generation: {e}")


# --- Example Usage ---
if __name__ == '__main__':
    # The new nested JSON structure
    new_json_data = {
        "Inspiration": [{
            "name": "Victorian",
            "src": "src/inspiration/Arctypes/Victorian/Victorian-1.png",
            "description": "The Victorian period bath presents the historically authentic \"subway tile\" aesthetic with a perfectly flat tile surface, pencil-thin grout lines and the gloss Avalon white restoration glaze that simulates the original patina of the original, vintage tilework. The high wainscot wall features a profile cap with seamless inside corners and coves to the unglazed porcelain floor mosaic, the optimal choice for its versatility, durability and slip resistance in wet areas."
        }],
        "Field_Type": [{
            "name": "66FF00",
            "src": "src/field-tile/69FT00.png"
        }],
        "Corner": [
            {
                "name": "Radius Cove & Bullnose (3⁄4\")",
                "src": "src/corner/Corner1.png"
            },
            {
                "name": "Series 15 Radius Cove & Bullnose (11⁄2\")",
                "src": "src/corner/Corner2.png"
            }
        ]
    }


    create_pdf_from_json(new_json_data, "categorized_report.pdf")