package sort.tests;

import java.util.function.Function;
import java.util.Arrays;
import java.util.Comparator;

import sort.mergesort.Mergesort;

public class Java {
 
    public static void main(String[] args) throws Exception {
        new Java();
    }

    private final Comparator<Integer> _ASC = (x, y) -> (x - y);
    private final Comparator<Integer> _DESC = (x, y) -> (y - x);

    public Java() {
        Mergesort<Integer> ms_asc = new Mergesort<>(this._ASC);
        Mergesort<Integer> ms_desc = new Mergesort<>(this._DESC);
        Integer[] arr = new Integer[] { 3, 5, 2, 7, 15, 0, 2, 8, 4 };
        {
            Test("mergesort", "asc", (i) -> ms_asc.Mergesort(i), this._ASC, arr);
            Test("mergesort", "desc", (i) -> ms_desc.Mergesort(i), this._DESC, arr);
            Test("mergesort", "empty", (i) -> ms_asc.Mergesort(i), this._ASC, new Integer[] {});
        }
    }

    public void Test(String algoName, String testName, Function<Integer[], Integer[]> sortAlgorithm, Comparator<Integer> sortBy, Integer[] given) {
        Integer[] expected = SortArray(given, sortBy);
        Integer[] sorted = sortAlgorithm.apply(given);
        
        for (int i = 0; i < expected.length; ++i) {
            if (sorted[i] != expected[i]) {
                System.out.println("Failed \"" + testName + "\" test on: " + algoName);
                System.exit(1);
            }
        }
        System.out.println("Passed \"" + testName + "\" test on: " + algoName);
    }

    public Integer[] SortArray(Integer[] arr, Comparator<Integer> sortBy) {
        Integer[] sorted = Arrays.copyOf(arr, arr.length);
        Arrays.sort(sorted, sortBy);
        return sorted;
    }
}