
const { jsPDF } = window.jspdf;

        function calculateResults() {
            const table = document.getElementById('studentTable').getElementsByTagName('tbody')[0];
            const rows = Array.from(table.getElementsByTagName('tr'));

            // Calculate first semester results
            rows.forEach(row => {
                const cells = row.getElementsByTagName('td');
                const scoresSem1 = [2, 3, 4, 5].map(i => parseInt(cells[i].innerText) || 0);
                const totalSem1 = scoresSem1.reduce((a, b) => a + b, 0);
                const avgSem1 = totalSem1 / scoresSem1.length;
                cells[6].innerText = totalSem1;
                cells[7].innerText = avgSem1.toFixed(2);
                row.dataset.totalSem1 = totalSem1;
                row.dataset.avgSem1 = avgSem1;
            });

            // Calculate second semester results
            rows.forEach(row => {
                const cells = row.getElementsByTagName('td');
                const scoresSem2 = [9, 10, 11, 12].map(i => parseInt(cells[i].innerText) || 0);
                const totalSem2 = scoresSem2.reduce((a, b) => a + b, 0);
                const avgSem2 = totalSem2 / scoresSem2.length;
                cells[13].innerText = totalSem2;
                cells[14].innerText = avgSem2.toFixed(2);
                row.dataset.totalSem2 = totalSem2;
                row.dataset.avgSem2 = avgSem2;
            });

            // Calculate overall average
            rows.forEach(row => {
                const avgSem1 = parseFloat(row.dataset.avgSem1) || 0;
                const avgSem2 = parseFloat(row.dataset.avgSem2) || 0;
                const overallAvg = (avgSem1 + avgSem2) / 2;
                row.dataset.overallAvg = overallAvg;
                row.querySelector('.overall-avg').innerText = overallAvg.toFixed(2);
            });

            // Rank by first semester total
            rows.sort((a, b) => b.dataset.totalSem1 - a.dataset.totalSem1);
            rows.forEach((row, index) => {
                row.querySelector('.rank-sem1').innerText = index + 1;
            });

            // Rank by second semester total
            rows.sort((a, b) => b.dataset.totalSem2 - a.dataset.totalSem2);
            rows.forEach((row, index) => {
                row.querySelector('.rank-sem2').innerText = index + 1;
            });

            // Rank by overall average
            rows.sort((a, b) => b.dataset.overallAvg - a.dataset.overallAvg);
            rows.forEach((row, index) => {
                row.querySelector('.overall-rank').innerText = index + 1;
            });

            // Append rows to the table to reflect updated order
            rows.forEach(row => table.appendChild(row));
        }

        function downloadPDF() {
            const doc = new jsPDF();
            // Header
            doc.setFontSize(18);
            doc.text('Student Roster', 14, 20);
            // Table
            const table = document.getElementById('studentTable');
            doc.autoTable({ html: table });
            // Save PDF
            doc.save('student_roster.pdf');
        }

