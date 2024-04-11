import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { CarritoComponent } from './carrito/carrito.component';
import { ContactoComponent } from './contacto/contacto.component';
import { ProductosComponent } from './productos/productos.component';
import { SobreNosotrosComponent } from './sobre-nosotros/sobre-nosotros.component';
import { LoginComponent } from './login/login.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { AgregarProductoComponent } from './agregar-producto/agregar-producto.component';
import { AdminProductosComponent } from './admin-productos/admin-productos.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: '', component: InicioComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'sobrenosotros', component: SobreNosotrosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registrarse', component: RegistrarComponent },
  { path: 'agregarProducto', component: AgregarProductoComponent },
  { path: 'adminProductos', component: AdminProductosComponent },
  { path: 'pedidos', component: PedidosComponent },
  { path: 'usuarios', component: UsuariosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
