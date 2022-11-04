package sort.selectionsort;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.ArrayList;

import sort.tests.Java.Sort;

public class Selectionsort<T> extends Sort<T> {

    public Selectionsort(Comparator<T> compare) {
        super(compare);
    }

    @Override
    public T[] Sort(T[] arr) {
        return selectionsort(Arrays.copyOf(arr, arr.length));
    }

    private T[] selectionsort(T[] arr) {
        List<T> original = new ArrayList<>(Arrays.asList(arr));
        List<T> list = new ArrayList<>();

        while (!original.isEmpty()) {
            int smallest = 0;
            for (int j = 1; j < original.size(); ++j) {
                if (this._COMPARE.compare(original.get(j), original.get(smallest)) < 0) {
                    smallest = j;
                }
            }
            list.add(original.get(smallest));
            original.remove(smallest);
        }

        for (int i = 0; i < list.size(); ++i) {
            arr[i] = list.get(i);
        }

        return arr;
    }
}