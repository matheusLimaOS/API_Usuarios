let knex = require("../database/connection");

class Sells{
    async insertVendaItem(produto,id_venda){
        try {
            await knex("vendas_itens").insert({
                id_venda: id_venda,
                id_produto: produto.ID_produto,
                descricao: produto.descricao,
                quantidade_vendida: produto.quantprod,
                valor_vendido: produto.valorprod
            });

            return {status:true};
        }
        catch (e){
            return {status:false,statusCode:500,message:"Erro interno do sistema"}
        }
    }
    async insertVenda(quantidade,valortotal,id_usuario){
        try{
            let id = await knex("vendas").insert({
                quantidade_vendida:quantidade,
                valor_vendido:valortotal,
                id_usuario:id_usuario
            });

            return {status:true,id:id}
        }
        catch (e){
            return {status:false,statusCode:500,message:"Erro interno do sistema"};
        }
    }
    async allSell(){
        try{
            let sells = await knex("vendas")
                .join("users",'vendas.id_usuario','=','users.id')
                .select(
                    'vendas.id_venda',
                        'Vendas.quantidade_vendida',
                        'Vendas.valor_vendido',
                        'Users.email as usuario',
                        'Vendas.hora_venda'
                )
            return {status:true,sells:sells};
        }
        catch (e){
            return {status:false,statusCode:500,message:'Erro interno do sistema'}
        }

    }
    async allViSell(id){
        try{
            let sells = await knex("vendas_itens")
                .select('*')
                .where({id_venda:id})

            return {status:true,sells:sells};
        }
        catch (e){
            return {status:false,statusCode:500,message:'Erro interno do sistema'}
        }

    }
}

module.exports = new Sells();
