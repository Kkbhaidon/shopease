/**
 * ShopEase order receiver — Google Apps Script
 * 1) Create a Google Sheet, then Extensions > Apps Script.
 * 2) Paste this file, save, run setup() once and authorize.
 * 3) Deploy > New deployment > Web app; Execute as Me; access Anyone.
 * 4) Copy the Web app URL into APPS_SCRIPT_URL in index.html.
 */
const SHEET_NAME = "Orders";
function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Timestamp","Order ID","Name","Phone","Address","City","State","PIN","Items JSON","Subtotal","Coupon","Payment","Order JSON"]);
  }
}
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) { setup(); sheet = ss.getSheetByName(SHEET_NAME); }
    const phone = String(data.phone || "").replace(/\D/g, "");
    if (!/^[6-9]\d{9}$/.test(phone)) throw new Error("Invalid phone");
    const usedCoupons = sheet.getLastRow() > 1
      ? sheet.getRange(2, 3, sheet.getLastRow()-1, 11).getValues()
      : [];
    const alreadyOrdered = usedCoupons.some(row => String(row[1]).replace(/\D/g,"") === phone);
    const couponValid = String(data.coupon || "").toUpperCase() === "RIYA" && !alreadyOrdered;
    const subtotal = Number(data.subtotal || 0);
    const discount = couponValid ? Math.round(subtotal * 0.20) : 0;
    const total = subtotal - discount;
    const orderId = "SE" + new Date().getTime();
    const finalData = Object.assign({}, data, {couponApplied: couponValid, discount: discount, total: total, orderId: orderId});
    sheet.appendRow([
      new Date(), orderId, data.name || "", phone,
      data.address || "", data.city || "", data.state || "", data.pincode || "",
      JSON.stringify(data.items || []), subtotal, couponValid ? "RIYA" : "",
      "COD", JSON.stringify(finalData)
    ]);
    return ContentService.createTextOutput(JSON.stringify({ok:true, orderId:orderId, couponApplied:couponValid, discount:discount, total:total}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ok:false,error:String(err)}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
