import type { CartItem } from "./CartContext";

export const GUEST_ORDERS_STORAGE_KEY = "zarz_orders";
export const CART_CHECKOUT_DRAFT_KEY = "zarz_cart_checkout_draft";
export const CART_LOGIN_RETURN_KEY = "zarz_cart_login_return";

export type PaymentMethod = "bankak" | "cash";

export interface OrderPayload {
  orderNumber: string;
  name: string;
  phone: string;
  paymentMethod: "bankak" | "whatsapp";
  paymentMethodLabel: string;
  paymentReference: string;
  total: string;
  currency: "SDG";
  status: "pending";
  productId: string | null;
  items: Array<{
    title: string;
    qty: number;
    price: number;
    productId: string;
    customData: Record<string, string | number | boolean | null>;
  }>;
  details: string;
  quantity: number;
}

export interface OrderRecord {
  id: string;
  orderNumber: string;
  total: string;
  status: string;
  date: string;
  method: string;
  items: Array<{ title: string; qty: number }>;
  remote: boolean;
}

function safeLocalStorageGet(key: string) {
  if (typeof window === "undefined") return "";
  try {
    return window.localStorage.getItem(key) || "";
  } catch {
    return "";
  }
}

function safeLocalStorageSet(key: string, value: string) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Ignore storage failures.
  }
}

function normalizeDetails(item: CartItem) {
  const details: Record<string, string | number | boolean | null> = {
    packageLabel: item.customData.packageLabel || null,
    targetLink: item.customData.targetLink || null,
    playerId: item.customData.playerId || null,
    server: item.customData.server || null,
    recipientPhone: item.customData.recipientPhone || null,
    requirements: item.customData.requirements || null,
    referenceLink: item.customData.referenceLink || null,
  };

  if (Array.isArray(item.customData.variations) && item.customData.variations.length > 0) {
    details.variations = item.customData.variations
      .map((entry) => `${entry.groupLabel}: ${entry.optionLabel}`)
      .join(" | ");
  }

  return details;
}

export function generateOrderNumber() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let result = "";
  for (let index = 0; index < 8; index += 1) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function getPaymentMethodLabel(method: PaymentMethod) {
  return method === "bankak" ? "تحويل بنكك" : "كاش";
}

export function buildCartDetailsLines(items: CartItem[]) {
  return items
    .map((item) => {
      const meta = Object.values(normalizeDetails(item)).filter(Boolean).join(" | ");
      return meta ? `${item.title} (x${item.qty}) - ${meta}` : `${item.title} (x${item.qty})`;
    })
    .join("\n");
}

export function buildOrderPayload(
  items: CartItem[],
  input: {
    orderNumber: string;
    name: string;
    phone: string;
    paymentMethod: PaymentMethod;
    paymentReference: string;
    total: string;
  },
): OrderPayload {
  return {
    orderNumber: input.orderNumber,
    name: input.name,
    phone: input.phone,
    paymentMethod: input.paymentMethod === "bankak" ? "bankak" : "whatsapp",
    paymentMethodLabel: getPaymentMethodLabel(input.paymentMethod),
    paymentReference: input.paymentReference,
    total: input.total,
    currency: "SDG",
    status: "pending",
    productId: items.length === 1 ? items[0].productId : null,
    items: items.map((item) => ({
      title: item.title,
      qty: item.qty,
      price: item.unitPrice,
      productId: item.productId,
      customData: normalizeDetails(item),
    })),
    details: buildCartDetailsLines(items),
    quantity: items.reduce((sum, item) => sum + item.qty, 0),
  };
}

export function createOrderRecord(payload: OrderPayload, remote: boolean): OrderRecord {
  return {
    id: `${payload.orderNumber}-${Date.now()}`,
    orderNumber: payload.orderNumber,
    total: payload.total,
    status: payload.status,
    date: new Date().toISOString(),
    method: payload.paymentMethodLabel,
    items: payload.items.map((item) => ({ title: item.title, qty: item.qty })),
    remote,
  };
}

export function readGuestOrders() {
  const rawValue = safeLocalStorageGet(GUEST_ORDERS_STORAGE_KEY);
  if (!rawValue) return [] as OrderRecord[];

  try {
    const parsedValue = JSON.parse(rawValue);
    return Array.isArray(parsedValue) ? (parsedValue as OrderRecord[]) : [];
  } catch {
    return [];
  }
}

export function writeGuestOrders(orders: OrderRecord[]) {
  safeLocalStorageSet(GUEST_ORDERS_STORAGE_KEY, JSON.stringify(orders));
}

export function formatOrderDate(value: string) {
  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) return "تاريخ غير متاح";
  return parsedDate.toLocaleDateString("ar-EG");
}

export function getOrderStatusText(value: string) {
  if (value === "pending") return "جاري المعالجة";
  if (value === "completed") return "مكتمل";
  return value || "غير محدد";
}

export function buildOrderWhatsAppLink(input: {
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  paymentMethodLabel: string;
  detailsText: string;
  totalText: string;
}) {
  const message = [
    `طلب جديد #${input.orderNumber}`,
    "",
    `الاسم: ${input.customerName}`,
    `الرقم: ${input.customerPhone}`,
    `طريقة الدفع: ${input.paymentMethodLabel}`,
    "",
    "الطلبات:",
    input.detailsText,
    "",
    `الإجمالي: ${input.totalText}`,
  ].join("\n");

  return `https://wa.me/201500007300?text=${encodeURIComponent(message)}`;
}
