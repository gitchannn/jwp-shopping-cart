const modal = document.getElementById('modal');

const showAddModal = () => {
    modal.dataset.formType = 'add';
    modal.style.display = 'block';
};

const showEditModal = (product) => {
    const elements = modal.getElementsByTagName('input');
    for (const element of elements) {
        element.value = product[element.getAttribute('name')];
    }
    modal.dataset.formType = 'edit';
    modal.dataset.productId = product.id;
    modal.style.display = 'block';
};

const hideAddModal = () => {
    modal.style.display = 'none';
    const elements = modal.getElementsByTagName('input');
    for (const element of elements) {
        element.value = '';
    }
}

const form = document.getElementById('form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    let product = {};
    for (const entry of formData.entries()) {
        const [key, value] = entry;
        product[key] = value;
    }

    if (modal.dataset.formType === 'edit') {
        product['id'] = modal.dataset.productId;
        updateProduct(product);
        return;
    }

    createProduct(product);
});

const createProduct = (product) => {
    const {name, imgUrl, price} = product;

    axios.request({
        url: '/admin/products',
        method: 'POST',
        data: {
            "name": name, "imgUrl": imgUrl, "price": price
        }
    }).then((response) => {
        window.location.reload();
    }).catch((error) => {
        console.error(error);
    });
};

const updateProduct = (product) => {
    const {id, name, imgUrl, price} = product;

    axios.request({
        url: '/admin/products/' + id, method: 'PUT', data: {
            "name": name, "imgUrl": imgUrl, "price": price
        }
    }).then((response) => {
        window.location.reload();
    }).catch((error) => {
        console.error(error);
    });
};

const deleteProduct = (id) => {
    axios.request({
        url: '/admin/products/' + id,
        method: 'DELETE'
    }).then((response) => {
        window.location.reload();
    }).catch((error) => {
        console.error(error);
    });
};
