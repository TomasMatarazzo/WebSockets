
class Persistencia{
    constructor(nombreTabla, configuracion){
      this.tabla = nombreTabla;
      this.configuracion = configuracion;
      this.knex = require('knex')(this.configuracion)
    }

    async createTableProductos(){
      try{
            console.log('se creo la base de datos')
            await this.knex.schema
            .createTable(this.tabla, tbl => {
            tbl.increments('id').primary();
            tbl.integer("price");
            tbl.text("title", 30);
            tbl.text("thumbnail", 30);
            })
            console.log('se creo')
          }
        catch(e){
          console.log('la tabla ya existe ')
        }
    }

    async createTableMensajes(){
      try{
            console.log('se creo la base de datos')
            await this.knex.schema
            .createTable(this.tabla, tbl => {
            tbl.increments('id').primary();
            tbl.text('mail', 30);
            tbl.text('mensaje', 30);
            })
            console.log('se creo')
          }
        catch(e){
          console.log(e)
        }
    }
  
    async insertar( o ){ 
      // guarda un objeto en la tabla
      console.log('se agrega producto');
        try{
          await this.knex(this.tabla).insert(o);
        }catch(e){
          console.log(e);
        }
    }
  
    async getById( id ){
      try{
        const element = await this.knex(this.tabla).where('idmensajes', '=',id);
        return element
      }
      catch(e){
        console.log('No se pudo obtener el objeto');
      }
    }
  
    async deleteById( id ){
      try{
        await this.knex(this.tabla).where('id', '=',id).del();
        console.log('se borro el elemento')
      }
      catch(e){
        console.log(e);
      }
    }
  
    async getAll(){
      try{
        const rows = await this.knex(this.tabla).select('*');
        return rows;
      }
      catch(e){
        console.log('No se pudo obtener los elementos de la tabla');
      }
    }
  
    async deleteAll(){
      try{
        await this.knex(this.tabla).del();

      }catch(e){
        console.log('No se puedo eliminar todos los datos');
      }
    }
  }
  

module.exports = Persistencia;
  