export function getYearsUnixTime(yearsList, monthOffset = 0) {
    const res = [];
    const monthInYear = 12;

    yearsList.forEach((year) => {
        for (let i = 1; i <= monthInYear; i++) {
            const lastDay = new Date(year, i, 0).getDate();

            const unixTime = {
                start: (new Date(`${year}-${i}-1 00:00:00`).getTime() + monthOffset) / 1000,
                end: new Date(`${year}-${i}-${lastDay} 23:59:59`).getTime() / 1000,
            };

            res.push(unixTime);
        }
    });
    return res;
}
