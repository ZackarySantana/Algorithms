package sort.tests;

import java.util.function.Function;
import java.util.Arrays;
import java.util.Comparator;

import sort.mergesort.Mergesort;
import sort.selectionsort.Selectionsort;
import sort.quicksort.Quicksort;

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
        TestSuite("mergesort", ms_asc, ms_desc);

        Selectionsort<Integer> ss_asc = new Selectionsort<>(this._ASC);
        Selectionsort<Integer> ss_desc = new Selectionsort<>(this._DESC);
        TestSuite("selectionsort", ss_asc, ss_desc);

        Quicksort<Integer> qs_asc = new Quicksort<>(this._ASC);
        Quicksort<Integer> qs_desc = new Quicksort<>(this._DESC);
        TestSuite("quicksort", ss_asc, ss_desc);

        if (failed) {
            System.exit(1);
        }
    }

    public void TestSuite(String algorithmName, Sort<Integer> sortAlgorithmAsc, Sort<Integer> sortAlgorithmDesc) {
        Integer[] arr = new Integer[] { 3, 5, 2, 7, 15, 0, 2, 8, 4 };

        System.out.println(algorithmName + ": ");
        Test("asc", sortAlgorithmAsc, this._ASC, arr);
        Test("desc", sortAlgorithmDesc, this._DESC, arr);
        Test("empty", sortAlgorithmAsc, this._ASC, new Integer[] {});
    }

    public void Test(String testName, Sort<Integer> sortAlgorithm, Comparator<Integer> sortBy, Integer[] given) {
        Integer[] expected = SortArray(given, sortBy);
        Integer[] sorted = sortAlgorithm.Sort(given);
        
        for (int i = 0; i < expected.length; ++i) {
            if (sorted[i] != expected[i]) {
                Print(testName + " failed");
                Print("expected " + Arrays.toString(expected), 2);
                Print("actual " + Arrays.toString(sorted), 2);
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
        Print(toPrint, 1);
    }

    public void Print(String toPrint, int tabs) {
        StringBuilder spaces = new StringBuilder();
        for (int i = 0; i < tabs; ++i) {
            spaces.append("  ");
        }
        System.out.println(spaces.toString() + toPrint);
    }

    public static abstract class Sort<T> {

        protected final Comparator<T> _COMPARE;

        public Sort(Comparator<T> compare) {
            this._COMPARE = compare;
        }

        public abstract T[] Sort(T[] arr);

    }
}