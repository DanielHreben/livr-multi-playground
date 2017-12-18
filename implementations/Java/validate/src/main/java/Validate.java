import org.json.simple.JSONObject;

import livr.LIVR;
import livr.Validator;

public class Validate {
    public static void main(String[] args) {
        try {
            JSONObject result = new JSONObject();
            Validator validator = LIVR.validator().init(args[1], false);

            JSONObject validData = validator.validate(args[0]);

            if (validData == null) {
                JSONObject errors = validator.getErrors();
                result.put("errors", errors);
            } else {
                result.put("output", validData);
            }

            System.out.print(result.toJSONString());
        } catch (Exception e) {
            e.printStackTrace();
            System.exit(1);
        }
    }
}
