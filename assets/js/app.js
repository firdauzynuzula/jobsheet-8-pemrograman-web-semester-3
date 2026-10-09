function initNavToggle() {
    const toggleButton = document.getElementById("nav-toggle-btn");
    const nav = document.querySelector("header nav");

    if (!toggleButton || !nav) return;

    toggleButton.addEventListener("click", function () {
        const isOpen = nav.classList.toggle("nav-open");
        toggleButton.setAttribute("aria-expanded", String(isOpen));
    });
}

function initHapusConfirm() {
    document.addEventListener("click", function (event) {
        const button = event.target.closest(".btn-hapus");
        if (!button) return;

        const row = button.closest("tr");
        const label = row?.querySelector("td")?.textContent.trim() || "data ini";
        const confirmed = window.confirm('Yakin ingin menghapus "' + label + '"?');

        if (confirmed && row) {
            row.remove();
        }
    });
}

function initTableFilter() {
    const input = document.getElementById("search-input");
    const table = document.querySelector(".table-responsive table");

    if (!input || !table) return;

    input.addEventListener("keyup", function () {
        const keyword = input.value.trim().toLowerCase();
        const searchColumn = Number(table.dataset.searchColumn || 0);

        table.querySelectorAll("tbody tr").forEach(function (row) {
            const cell = row.querySelectorAll("td")[searchColumn];
            const text = cell ? cell.textContent.toLowerCase() : "";
            row.style.display = text.includes(keyword) ? "" : "none";
        });
    });
}

function tampilkanError(input, message) {
    hapusError(input);
    const error = document.createElement("span");
    error.className = "error";
    error.textContent = message;
    input.insertAdjacentElement("afterend", error);
}

function hapusError(input) {
    const nextElement = input.nextElementSibling;
    if (nextElement?.classList.contains("error")) {
        nextElement.remove();
    }
}

function validasiWajib(form, name, message) {
    const input = form.querySelector("[name='" + name + "']");
    if (!input) return true;

    if (input.value.trim() === "") {
        tampilkanError(input, message);
        return false;
    }

    hapusError(input);
    return true;
}

function initValidasiForm() {
    const form = document.getElementById("form-tambah");
    if (!form) return;

    form.addEventListener("submit", function (event) {
        let valid = true;
        const isBookForm = form.querySelector("[name='judul']");

        valid = validasiWajib(form, isBookForm ? "judul" : "nama", "Field ini wajib diisi.") && valid;
        valid = validasiWajib(form, isBookForm ? "pengarang" : "no_anggota", "Field ini wajib diisi.") && valid;

        if (isBookForm) {
            const year = form.querySelector("[name='tahun']");
            const stock = form.querySelector("[name='stok']");
            const isbn = form.querySelector("[name='isbn']");
            const yearValue = Number(year.value);
            const stockValue = Number(stock.value);

            if (!year.value || !Number.isInteger(yearValue) || yearValue < 1900 || yearValue > 2026) {
                tampilkanError(year, "Tahun harus di antara 1900-2026.");
                valid = false;
            } else {
                hapusError(year);
            }

            if (!stock.value || !Number.isInteger(stockValue) || stockValue < 0) {
                tampilkanError(stock, "Stok harus berupa angka 0 atau lebih.");
                valid = false;
            } else {
                hapusError(stock);
            }

            if (isbn.value.trim() !== "" && !/^[0-9-]+$/.test(isbn.value.trim())) {
                tampilkanError(isbn, "ISBN hanya boleh berisi angka dan tanda hubung.");
                valid = false;
            } else {
                hapusError(isbn);
            }
        }

        if (!valid) {
            event.preventDefault();
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    initNavToggle();
    initHapusConfirm();
    initTableFilter();
    initValidasiForm();
});
