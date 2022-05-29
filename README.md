This is a human-friendly version of Interface3 schedule.

<img width="600" alt="Screenshot 2022-05-29 at 21 53 01" src="https://user-images.githubusercontent.com/46354296/170889025-c8f6e924-96c8-492c-a28f-c54bf31b57b5.png">


It gets its data from [this table](https://interface3.odoo.com/horaire-tv/aaaa-bbbb-cccc-dddd-eeee), adjusts its presentation, and adds filtering feature on top. 

In other words, it mirrors the information from the odoo table.

<img width="600" alt="Screenshot 2022-05-27 at 14 59 12" src="https://user-images.githubusercontent.com/46354296/170816706-160dc31f-2e38-4fe5-8470-83828ca8bdf1.png">

## How to apply filters
Click on filter icon on the right of a column header. 

### Dropdown presents a list of all the available options

<img width="600" alt="Screenshot 2022-05-28 at 09 27 10" src="https://user-images.githubusercontent.com/46354296/170816638-285b3be5-81e2-42bf-99b5-bf690f9e65d2.png">

Choose an option and click `OK`.

Then only selected entries are shown.

### Another filter can be added on top

<img width="600" alt="Screenshot 2022-05-28 at 09 27 44" src="https://user-images.githubusercontent.com/46354296/170816692-2be1a175-fe0e-4eb5-98b4-54da5b028c93.png">

Then only entries that comply to both filtering criteria, are shown.

<img width="600" alt="Screenshot 2022-05-28 at 09 28 10" src="https://user-images.githubusercontent.com/46354296/170816837-6a3427ca-3f5d-4570-b072-c28e69ca4868.png">

To undo, press `Reset`, or uncheck all selected checkboxes and press `OK`.


## To run it locally

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
