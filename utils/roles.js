const accessControl = require('accesscontrol');

const ac = new accessControl();

//Roles
//1. Administrador
//2. Cliente
//3. Gerente

//Cliente
//Ver [productos (cualquiera), ordenes de venta(nuestras), transacciones (nuestras), ordenes de producto (nuestras), categorias (cualquiera) ]
//Crear [ordenes de venta(nuestras), transacciones (nuestras), ordenes de producto (nuestras) ]
//Editar [ordenes de producto (nuestras)]
//Borrar 

//Gerente
//Ver [ *Cliente (cualquiera), cupones, status, categorias de productos, sesiones]
//Crear [ *Cliente (cualquiera), cupones, status, categorias de productos, sesiones]
//Editar [ *Cliente (cualquiera), cupones, status, categorias de productos, sesiones]
//Borrar [ *Cliente (cualquiera), cupones, status, categorias de productos, sesiones]

//Administrador
//Ver, Crear, Editar, Borrar (* Entidades) 


const roles = () => {
    ac.grant('Client')
        .readAny('Products')
        .readOwn('Sales_Orders')
        .readOwn('CC_Transactions')
        .readOwn('Order_Products')
        .readAny('Categories')
        .createOwn('Sales_Orders')
        .createOwn('CC_Transactions')
        .createOwn('Order_Products')
        .updateOwn('Order_Products')
    ac.grant('Manager').extend('Client')
        .readAny('Sales_Orders')
        .readAny('CC_Transactions')
        .readAny('Order_Products')
        .readAny('Coupons')
        .readAny('Product_Statuses')
        .readAny('Product_Categories')
        .readAny('Sessions')
        .createAny('Sales_Orders')
        .createAny('CC_Transactions')
        .createAny('Order_Products')
        .createAny('Coupons')
        .createAny('Product_Statuses')
        .createAny('Product_Categories')
        .createAny('Sessions')
        .updateAny('Sales_Orders')
        .updateAny('CC_Transactions')
        .updateAny('Order_Products')
        .updateAny('Coupons')
        .updateAny('Product_Statuses')
        .updateAny('Product_Categories')
        .updateAny('Sessions')
        .deleteAny('Sales_Orders')
        .deleteAny('CC_Transactions')
        .deleteAny('Order_Products')
        .deleteAny('Coupons')
        .deleteAny('Product_Statuses')
        .deleteAny('Product_Categories')
        .deleteAny('Sessions')
    ac.grant('Admin').extend('Manager')
        .readAny('Users')
        .readAny('User_Roles')
        .readAny('Roles')
        .readAny('Tags')
        .readAny('Product_Tags')
        .createAny('Users')
        .createAny('User_Roles')
        .createAny('Roles')
        .createAny('Tags')
        .createAny('Product_Tags')
        .updateAny('Users')
        .updateAny('User_Roles')
        .updateAny('Roles')
        .updateAny('Tags')
        .updateAny('Product_Tags')
        .deleteAny('Users')
        .deleteAny('User_Roles')
        .deleteAny('Roles')
        .deleteAny('Tags')
        .deleteAny('Product_Tags')

    return ac;
}

module.exports = roles;
