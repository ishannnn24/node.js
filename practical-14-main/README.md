 Practical - DDL, DML, and DCL Commands

This practical demonstrates the use of **DDL (Data Definition Language)**, **DML (Data Manipulation Language)**, and **DCL (Data Control Language)** commands in SQL databases such as MySQL, MongoDB, or PostgreSQL.

The objective is to understand how to:
- Create and modify database structures.
- Insert, update, and delete data.
- Manage access and permissions for database users.

---

 DDL – Data Definition Language**


**Common Commands:**
| Command | Description | Example |
|----------|--------------|----------|
| `CREATE` | Creates database objects like tables, schemas | `CREATE TABLE students (id INT, name VARCHAR(50));` |
| `ALTER` | Modifies existing database objects | `ALTER TABLE students ADD COLUMN age INT;` |
| `DROP` | Deletes database objects | `DROP TABLE students;` |
| `TRUNCATE` | Removes all data but keeps the structure | `TRUNCATE TABLE students;` |

---

 DML – Data Manipulation Language**

**Purpose:**  
Used to manage and manipulate data within tables.

**Common Commands:**
| Command | Description | Example |
|----------|--------------|----------|
| `INSERT` | Adds new records | `INSERT INTO students VALUES (1, 'Ishan', 21);` |
| `UPDATE` | Modifies existing records | `UPDATE students SET age = 22 WHERE id = 1;` |
| `DELETE` | Removes records | `DELETE FROM students WHERE id = 1;` |
| `SELECT` | Retrieves data | `SELECT * FROM students;` |

---

DCL – Data Control Language**

**Purpose:**  
Used to control access and permissions in the database.

**Common Commands:**
| Command | Description | Example |
|----------|--------------|----------|
| `GRANT` | Gives privileges to users | `GRANT SELECT, INSERT ON students TO 'user1';` |
| `REVOKE` | Removes privileges | `REVOKE INSERT ON students FROM 'user1';` |
| `COMMIT` | Saves all changes made in the transaction | `COMMIT;` |
| `ROLLBACK` | Undoes changes not yet committed | `ROLLBACK;` |

---

## 🧠 **Understanding the Differences**
