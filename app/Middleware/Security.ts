import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import axios from "axios";
import Env from "@ioc:Adonis/Core/Env";
import TokenContext from "App/Utils/TokenContext";

export default class Security {
  public async handle(
    { request, response }: HttpContextContract,
    next: () => Promise<void>,
  ) {
    let theRequest = request.toJSON();
    let token = theRequest.headers.authorization.replace("Bearer ", "");
    let thePermission: object = {
      url: theRequest.url,
      method: theRequest.method,
    };
    try {
      const result = await axios.post(
        `${Env.get("MS_SECURITY")}/api/public/security/permissions-validation`,
        thePermission,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (result.data == true) {
        TokenContext.setToken(token);
        await next(); // next() permite que el request siga su curso, es decir, que llegue al controlador
      } else {
        return response.status(401);
      }
    } catch (error) {
      console.error(error);
      return response.status(401);
    }
  }
}
