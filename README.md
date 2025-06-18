
# RESTful API Express

Sebuah RESTful API yang dibangun dengan Express.js untuk mengelola kontak dan alamat pengguna.

## Fitur

* **Autentikasi Pengguna**: Sistem registrasi, login, dan logout pengguna yang aman menggunakan token.
* **Manajemen Kontak**: Pengguna dapat membuat, membaca, memperbarui, dan menghapus (CRUD) kontak mereka.
* **Manajemen Alamat**: Setiap kontak dapat memiliki banyak alamat, dengan operasi CRUD penuh untuk alamat.
* **Pencarian Lanjutan**: Pencarian kontak berdasarkan nama, email, atau nomor telepon dengan paginasi.
* **Validasi Data**: Validasi input yang kuat untuk memastikan integritas data.
* **Middleware**: Penggunaan middleware untuk otentikasi dan penanganan error.

## Teknologi yang Digunakan

* **Backend**: Node.js, Express.js
* **Database**: PostgreSQL dengan Prisma sebagai ORM
* **Testing**: Jest dan Supertest
* **Validasi**: Joi
* **Logging**: Winston
* **Lainnya**: bcrypt untuk hashing password, dan UUID untuk token unik.

## Endpoint API

### API Publik

* `POST /api/users`: Registrasi pengguna baru.
* `POST /api/users/login`: Login pengguna.

### API Pengguna (Membutuhkan Otentikasi)

* `GET /api/users/current`: Mendapatkan data pengguna saat ini.
* `PATCH /api/users/current`: Memperbarui data pengguna saat ini.
* `DELETE /api/users/logout`: Logout pengguna.

### API Kontak (Membutuhkan Otentikasi)

* `POST /api/contacts`: Membuat kontak baru.
* `GET /api/contacts`: Mencari kontak.
* `GET /api/contacts/:contactId`: Mendapatkan detail kontak.
* `PUT /api/contacts/:contactId`: Memperbarui kontak.
* `DELETE /api/contacts/:contactId`: Menghapus kontak.

### API Alamat (Membutuhkan Otentikasi)

* `POST /api/contacts/:contactId/addresses`: Membuat alamat baru untuk kontak.
* `GET /api/contacts/:contactId/addresses`: Mendapatkan daftar alamat dari sebuah kontak.
* `GET /api/contacts/:contactId/addresses/:addressId`: Mendapatkan detail alamat.
* `PUT /api/contacts/:contactId/addresses/:addressId`: Memperbarui alamat.
* `DELETE /api/contacts/:contactId/addresses/:addressId`: Menghapus alamat.

## Skema Database

### Tabel `users`

* `username` (VARCHAR, Primary Key)
* `password` (VARCHAR)
* `name` (VARCHAR)
* `token` (VARCHAR)


### Tabel `contacts`

* `id` (SERIAL, Primary Key)
* `firstName` (VARCHAR)
* `lastName` (VARCHAR, Nullable)
* `email` (VARCHAR, Nullable)
* `phone` (VARCHAR, Nullable)
* `username` (VARCHAR, Foreign Key ke `users.username`)



### Tabel `addresses`

* `id` (SERIAL, Primary Key)
* `street` (VARCHAR, Nullable)
* `city` (VARCHAR, Nullable)
* `province` (VARCHAR, Nullable)
* `country` (VARCHAR)
* `postalCode` (VARCHAR)
* `contactId` (INTEGER, Foreign Key ke `contacts.id`)



## Instalasi dan Menjalankan

1.  **Clone repositori:**
    ```bash
    git clone [https://github.com/wahyunugrahha/restful-api-express.git](https://github.com/wahyunugrahha/restful-api-express.git)
    cd restful-api-express
    ```

2.  **Install dependensi:**
    ```bash
    npm install
    ```

3.  **Setup database:**
    Pastikan Anda memiliki PostgreSQL yang berjalan dan konfigurasikan koneksi database di file `.env`. Jalankan migrasi Prisma:
    ```bash
    npx prisma migrate dev
    ```

4.  **Menjalankan aplikasi:**
    ```bash
    npm start
    ```
    Server akan berjalan di `http://localhost:3000`.

## Testing

Untuk menjalankan tes, gunakan perintah berikut:

```bash
npm test



----
Made with love by Wahyu🔥
