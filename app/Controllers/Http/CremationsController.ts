import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cremation from 'App/Models/Cremation';
import CremationValidator from 'App/Validators/CremationValidator';

export default class CremationsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
          return await Cremation.findOrFail(params.id);
        }
        const data = request.all();
    
        if ("page" in data && "per_page" in data) {
          const page = request.input("page", 1);
          const perPage = request.input("per_page", 20);
    
          return await Cremation.query().paginate(page, perPage);
        }
        return await Cremation.all();
      }
      
      public async create({ request }: HttpContextContract) {
        const body = await request.validate(CremationValidator);
        const theCremation: Cremation = await Cremation.create(body);
        return theCremation;
      }
    
      public async update({ request, params }: HttpContextContract) {
        const data = request.body();
        const cremation = await Cremation.findOrFail(params.id);
        cremation.merge(data);
        return await cremation.save();
      }
    
      public async delete({ params, response }: HttpContextContract) {
        const cremation = await Cremation.findOrFail(params.id);
        response.status(204);
        return await cremation.delete();
      }
}
