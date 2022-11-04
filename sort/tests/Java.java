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

    private boolean failed = false;

    public Java() {
        Mergesort<Integer> ms_asc = new Mergesort<>(this._ASC);
        Mergesort<Integer> ms_desc = new Mergesort<>(this._DESC);
        Integer[] arr = new Integer[] { 3, 5, 2, 7, 15, 0, 2, 8, 4 };
        {
            System.out.println("mergesort: ");
            Test("asc", ms_asc, this._ASC, arr);
            Test("desc", ms_desc, this._DESC, arr);
            Test("empty", ms_asc, this._ASC, new Integer[] {});
        }

        if (failed) {
            System.exit(1);
        }
    }

    public void Test(String testName, Sort<Integer> sortAlgorithm, Comparator<Integer> sortBy, Integer[] given) {
        Integer[] expected = SortArray(given, sortBy);
        Integer[] sorted = sortAlgorithm.Sort(given);
        
        for (int i = 0; i < expected.length; ++i) {
            if (sorted[i] != expected[i]) {
                Print(testName + " failed");
                this.failed = true;
                return;
            }
        }
        Print(testName + " passed");
    }

    public Integer[] SortArray(Integer[] arr, Comparator<Integer> sortBy) {
        Integer[] sorted = Arrays.copyOf(arr, arr.length);
        Arrays.sort(sorted, sortBy);
        return sorted;
    }

    public void Print(String toPrint) {
        System.out.println("  " + toPrint);
    }

    public static abstract class Sort<T> {

        private final Comparator<T> _COMPARE;

        public Sort(Comparator<T> compare) {
            this._COMPARE = compare;
        }

        public abstract T[] Sort(T[] arr);

    }
}