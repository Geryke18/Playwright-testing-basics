# API Test Plan: Swagger Petstore (Pet Module)

## 1. Endpoint: `POST /pet`
**Description:** Add a new pet to the store.  
**Consumes:** `application/json`, `application/xml`  
**Security:** OAuth2 (`write:pets`, `read:pets`)

### 1.1 Functional Testing (Happy Path)
| Test Case ID | Scenario | Input Data | Expected Result |
| :--- | :--- | :--- | :--- |
| **POST-01** | Create pet with required fields | `name`, `photoUrls` | 200 OK; Response matches sent object. |
| **POST-02** | Create pet with all fields | `id`, `category`, `name`, `photoUrls`, `tags`, `status` | 200 OK; All nested objects stored correctly. |
| **POST-03** | Verify XML format | Valid XML payload | 200 OK; Content-Type: `application/xml`. |

### 1.2 Negative & Boundary Testing
| Test Case ID | Scenario | Input Data | Expected Result |
| :--- | :--- | :--- | :--- |
| **POST-04** | Missing required `name` | `{ "photoUrls": ["str"] }` | 405 Invalid Input. |
| **POST-05** | Missing required `photoUrls` | `{ "name": "doggie" }` | 405 Invalid Input. |
| **POST-06** | Invalid Status Enum | `{ "status": "happy" }` | 405 Invalid Input (Must be available/pending/sold). |
| **POST-07** | Empty Body | `{}` | 405 Invalid Input. |
| **POST-08** | Invalid ID format | 405 Invalid Input.|
| **POST-09** | Unsupported Content-Type| `text/plain` | 415 Unsupported Media Type. |

---

## 2. Endpoint: `GET /pet/{petId}`
**Description:** Returns a single pet based on the ID.  
**Produces:** `application/json`, `application/xml`  
**Security:** API Key

### 2.1 Functional Testing (Happy Path)
| Test Case ID | Scenario | Input Data | Expected Result |
| :--- | :--- | :--- | :--- |
| **GET-01** | Fetch existing pet by ID | Existing `petId` (e.g., 0) | 200 OK; Body contains correct pet details. |
| **GET-02** | Verify response schema | Valid `petId` | 200 OK; Structure matches `#definitions/Pet`. |

### 2.2 Negative & Boundary Testing
| Test Case ID | Scenario | Input Data | Expected Result |
| :--- | :--- | :--- | :--- |
| **GET-03** | Pet not found | Non-existent `petId` (e.g., 999999) | 404 Pet not found. |
| **GET-04** | Invalid ID format | String ID (e.g., `/pet/abc`) | 400 Invalid ID supplied. |
| **GET-05** | ID out of bounds | Extremely large `int64` | 400 Invalid ID supplied. |

---

## 3. Integration Testing (Workflow)
**Objective:** Ensure that data created via POST is accurately retrievable via GET.

1. **Step 1:** Perform `POST /pet` with a unique name (e.g., "Automation_Pet_123").
2. **Step 2:** Extract the `id` from the POST response.
3. **Step 4:** Perform `GET /pet/{id}` using the extracted ID.
4. **Assertion:** Verify the `name` and `photoUrls` in the GET response exactly match the POST request.

---

## 4. Technical Constraints & Assertions
* **Response Time:** All requests should complete within **500ms** (Performance).
* **Security:**
    * Verify `POST /pet` fails with **401/403** if OAuth token is missing/invalid.
    * Verify `GET /pet/{petId}` fails if `api_key` header is missing (if enforced by server).
* **Headers:**
    * Verify `Content-Type` header matches requested format (`application/json` or `application/xml`).
* **Schema Validation:**
    * `id` must be an `integer (int64)`.
    * `photoUrls` must be an `array` of strings.
    * `status` must match defined enums: `available`, `pending`, `sold`.


---

## 5. Test Automation
* **Automation Tool:** Playwright
* **Selected tests to automate from POST /pet:**
  * Create pet with required fields - POST-01
  * Create pet with all fields - POST-02
  * Create pet with invalid ID format - POST-06
* **Selected tests to automate from `GET /pet/{petId}:**
  * Fetch existing pet by ID - GET-01
  * Invalid ID format - GET-04
  * ID out of bounds - GET-05
* **Also a little workflow-ish test**