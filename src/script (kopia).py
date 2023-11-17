import pandas as pd
import openai

# Set your OpenAI API key
openai.api_key = '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'

def generate_description(title, category):
    prompt = f"""Create a unique, SEO-optimized, HTML-formatted product description for the following Photoshop PSD template used for online account verifications, don't mention stuff like its integrating well with Woocommerce, these are only PSD files tat customers need for various online verifications mostly.
    Product Title: {title}
    Product Category: {category}
    Emphasize the template's ease of use, immediate availability after purchase, customization features, and utility for specific online verification purposes. Include HTML tags for web display.

    Format example:
    `<h2><strong>{title} - Essential for Online Verification</strong></h2>
    <p>Introducing our latest <strong>{title}</strong>, a versatile and editable Photoshop template designed for {category}. This template is a must-have for seamless online account verifications, offering easy customization and immediate availability.</p>
    <p><strong>Key Features:</strong></p>
    <ul>
      <li><strong>User-Friendly Design:</strong> Easy to edit, perfect for quick modifications and updates.</li>
      <li><strong>Instant Access:</strong> Download the Photoshop template right after purchase and get started immediately.</li>
      <li><strong>Customization at Its Best:</strong> Modify text, images, and layout to fit your specific verification needs.</li>
    </ul>
    <p>Get your hands on the <strong>{title}</strong> now and streamline your verification process. Available for direct integration into WooCommerce, this template is the ideal solution for your verification needs.</p>`
    """
    response = openai.Completion.create(
      model="text-davinci-003",  # Using GPT-3.5 model
      prompt=prompt,
      max_tokens=300
    )
    return response.choices[0].text.strip()

# Read the CSV file
df = pd.read_csv('new.csv')

# Generate descriptions for each row
for index, row in df.iterrows():
    if pd.isna(row['Product Description']) or row['Product Description'] == '':
        description = generate_description(row['Title/Name'], row['Product Category'])
        df.at[index, 'Product Description'] = description

# Save the updated CSV file
df.to_csv('updated-new.csv', index=False)
