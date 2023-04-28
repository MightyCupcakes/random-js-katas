import java.lang.StringBuilder;

class Solution {

    static String toCamelCase(String s){
        String[] strings = Pattern.compile("[-_]").split(s);

        return IntStream.range(0, strings.length)
                .filter(index -> !strings[index].isEmpty())
                .mapToObj( index -> index == 0 ? strings[index] : strings[index].substring(0, 1).toUpperCase() + strings[index].substring(1))
                .reduce( "", (prev, curr) -> prev + curr);
    }

    public static void main(String[] args) {
        System.out.println(Solution.toCamelCase(toCamelCase("the-stealth-warrior")));
        System.out.println(Solution.toCamelCase(toCamelCase("The_Stealth_Warrior")));
        System.out.println(Solution.toCamelCase(toCamelCase("The_Stealth-Warrior")));
        System.out.println(Solution.toCamelCase(toCamelCase("The_Stealth--Warrior")));
    }
}
