# ShopEase — GitHub Pages perfume store

## Included
- `index.html`: responsive perfume storefront, cart, COD checkout and RIYA coupon UI.
- `assets/`: the product photos you uploaded.
- `google-apps-script.gs`: receives order requests and stores them in Google Sheets.

## Before publishing
1. Open `index.html` and replace `WHATSAPP_NUMBER` with your own WhatsApp number in international format, digits only. For India, start with `91` (example format: `919876543210`). The number is blank until you add and verify your WhatsApp number.
2. Connect Google Sheets:
   - Create a new Google Sheet.
   - Open Extensions → Apps Script.
   - Paste the contents of `google-apps-script.gs`.
   - Save, select `setup` and Run once; approve permissions.
   - Deploy → New deployment → Web app.
   - Execute as: Me. Who has access: Anyone.
   - Deploy and copy the Web app URL.
   - Paste it into `APPS_SCRIPT_URL` in `index.html`.
3. Upload `index.html`, the `assets` folder and this script to a GitHub repository.
4. In GitHub: Settings → Pages → Deploy from a branch → `main` → `/ (root)` → Save.
5. Wait for GitHub Pages to publish your site.

## Important operational notes
- GitHub Pages hosts only static files; Google Apps Script is the order receiver.
- The order form opens WhatsApp with a pre-filled message. The customer must tap Send. Fully automatic WhatsApp notifications require WhatsApp Business Platform/API and its setup.
- The Sheet script checks whether the phone number already has an order before accepting the RIYA first-order discount. It stores customer details, so keep the Sheet private and share it only with trusted people.
- The storefront currently displays ₹220 per perfume and an illustrative crossed-out ₹275 price. Change or remove that crossed-out price if ₹275 is not a genuine regular price.
- The website presents COD order requests; it does not verify Meesho stock, place Meesho orders, or confirm delivery automatically. Check supplier/reselling terms and availability before accepting an order.
- All four products are listed at ₹220: Riya Melody Eau De Parfum (two photos/variants), Riya Melody Mimosa Musk, and Riya Melody Raspberry Candy. The ml sizes are intentionally not displayed.
- Coupon `RIYA` is intended for one first order per phone number. A customer can potentially use another phone number; for stronger fraud prevention, manual review or a proper commerce backend is needed.

## Customer confirmation
After checkout, the site displays a confirmation screen with an order ID, COD payment method and estimated delivery of 3–5 days after dispatch confirmation. This is an estimate, not a guaranteed delivery promise; confirm the actual delivery window with the supplier/courier before advertising it as guaranteed.
