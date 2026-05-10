# Test Plan: SauceDemo (Login & Cart Management)

**Project:** SauceLabs E-Commerce Practice Site

---

## 1. Feature: Authentication (Login)
**Objective:** Verify that the system handles various user types, security inputs, and performance constraints during the login process.

### 1.1 Happy Path
| Test Case ID | Description | Input Data | Expected Result |
| :--- | :--- | :--- | :--- |
| **AUTH-01** | Successful Login | `standard_user` | Redirected to Products page; Inventory is visible. |

### 1.2 Negative & Boundary Testing
| Test Case ID | Description | Input Data | Expected Result |
| :--- | :--- | :--- | :--- |
| **AUTH-02** | Invalid Password | Correct User / Wrong PW | Error: "Username and password do not match..." |
| **AUTH-03** | Invalid Username | Wrong User / Correct PW | Error: "Username and password do not match..." |
| **AUTH-04** | Empty Fields | Both fields null | Error: "Username is required" |
| **AUTH-05** | Missing Password | `standard_user` / null | Error: "Password is required" |
| **AUTH-06** | Locked Out User | `locked_out_user` | Error: "Sorry, this user has been locked out." |
| **AUTH-07** | UI: Close Alert | Any error trigger | Error message disappears upon clicking 'X'. |

### 1.3 Advanced & Security Testing
| Test Case ID | Description | Input Data | Expected Result |
| :--- | :--- | :--- | :--- |
| **AUTH-08** | Performance Check | `performance_glitch_user` | Login succeeds; Time-to-Navigate is logged/measured. |
| **AUTH-09** | SQL Injection | `standard_user'--` | Input is sanitized; Login fails (No unauthorized access). |

---

## 2. Feature: Cart Management
**Objective:** Ensure the shopping cart accurately tracks item counts, persists data across sessions, and allows for flexible navigation.

### 2.1 Core Functionality (Adding/Removing)
> **Global Assertion:** For every action below, the `shopping-cart-badge` must exactly match the number of items stored in the internal cart state.

| Test Case ID | Description | Action Location | Expected Result |
| :--- | :--- | :--- | :--- |
| **CART-01** | Add from Catalog | Products Page | Badge increments; Item appears in `/cart`. |
| **CART-02** | Add from Details | Product Detail Page | Badge increments; Item appears in `/cart`. |
| **CART-03** | Multi-Item Add | Products Page (x2) | Badge shows "2"; Both items exist in cart. |
| **CART-04** | Bulk Add (Catalog) | All Products | Badge shows "6"; All items exist in cart. |
| **CART-05** | Remove (Cart) | Cart Page | Badge decrements; Item removed from list. |
| **CART-06** | Remove (Catalog)| Products Page | Badge decrements; "Add to Cart" button reappears. |

### 2.2 Logic & Persistence
| Test Case ID | Description | Scenario | Expected Result |
| :--- | :--- | :--- | :--- |
| **CART-07** | Duplicate Add | Add same item twice | **Reported Bug:** Not possible currently |
| **CART-08** | Empty Cart | Before Add anything or Remove all items | Badge disappears; Cart list is empty. |
| **CART-09** | Session Persistence| Log out with items in cart | Items remain in cart upon re-login with same user. |

### 2.3 Navigation Flow
| Test Case ID | Description | Action | Expected Result |
| :--- | :--- | :--- | :--- |
| **NAV-01** | Continue Shopping | Click "Continue Shopping" in Cart | User redirected back to Products page. |
| **NAV-02** | Sidebar Nav | Menu -> All Items | User redirected back to Products page from any state. |

---

## 3. Defects & Observations
* **BUG-001:** Duplicate items cannot be added, yet the Cart Page contains a "Quantity" (QTY) column.
    * *Severity:* Minor (UX Inconsistency)
    * *Suggestion:* Allow multiple clicks on "Add to Cart" to increment QTY, or remove the QTY column if the shop only allows 1 of each item.

---

## 4. Test Automation
* **Automation Tool:** Playwright using Page Object Model (POM).
* **Selected tests to automate from Authentication:**
  * Successful Login - AUTH-01
  * Invalid Password - AUTH-02
  * Invalid Username - AUTH-03
  * Empty Fields - AUTH-04
  * Missing Password - AUTH-05
* **Selected tests to automate from Cart Management:**
  * Bulk Add - CART-04 and Remove - CART-06 in 1 test
  * Session Persistence - CART-09
