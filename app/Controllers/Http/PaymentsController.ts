import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Payment from 'App/Models/Payment';
import PaymentValidator from 'App/Validators/PaymentValidator';

export default class PaymentsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
          let thePayment: Payment =
            await Payment.findOrFail(params.id);
          return thePayment;
        } else {
          const data = request.all();
          if ("page" in data && "per_page" in data) {
            const page = request.input("page", 1);
            const perPage = request.input("per_page", 20);
            return await Payment.query().paginate(page, perPage);
          } else {
            return await Payment.query();
          }
        }
      }
      public async create({ request }: HttpContextContract) {
        const body = await request.validate(PaymentValidator);
        const thePayment: Payment =
          await Payment.create(body);
        return thePayment;
      }
    
      public async update({ params, request }: HttpContextContract) {
        const thePayment: Payment =
          await Payment.findOrFail(params.id);
        const data = request.body();
        thePayment.merge(data);
        return await thePayment.save();
      }
    
      public async delete({ params, response }: HttpContextContract) {
        const thePayment: Payment =
          await Payment.findOrFail(params.id);
        response.status(204);
        return await thePayment.delete();
      }
}
