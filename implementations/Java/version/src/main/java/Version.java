import livr.LIVR;
import livr.Validator;

public class Version {
    public static void main(String[] args) {
        String javaVersion = System.getProperty("java.version");
        String livrVersion = LIVR.validator().getClass().getPackage().getSpecificationVersion();

        System.out.println("OpenJDK " + javaVersion + " livr 2.0"); // TODO
    }
}
