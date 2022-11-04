package sort.mergesort;

import java.util.Arrays;
import java.util.Comparator;

import sort.tests.Java.Sort;

public class Mergesort<T> extends Sort<T> {

    public Mergesort(Comparator<T> compare) {
        super(compare);
    }

    @Override
    public T[] Sort(T[] arr) {
        return mergesort(Arrays.copyOf(arr, arr.length));
    }

    private T[] mergesort(T[] arr) {
        if (arr.length < 2) {
            return arr;
        }

        int middle = arr.length / 2;

        return merge(
            mergesort(Arrays.copyOfRange(arr, 0, middle)),
            mergesort(Arrays.copyOfRange(arr, middle, arr.length)),
            arr
        );
    }

    private T[] merge(T[] arr1, T[] arr2, T[] mergeInto) {

        int left = 0;
        int right = 0;
        int i = 0;

        for (; left < arr1.length && right < arr2.length; ++i) {
            if (this._COMPARE.compare(arr1[left], arr2[right]) < 0) {
                mergeInto[i] = arr1[left++];
            } else {
                mergeInto[i] = arr2[right++];
            }
        }

        for (; left < arr1.length; ++left) {
            mergeInto[i++] = arr1[left];
        }

        for (; right < arr2.length; ++right) {
            mergeInto[i++] = arr2[right];
        }

        return mergeInto;
    }
}