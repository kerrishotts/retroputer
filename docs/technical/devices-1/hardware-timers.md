# Hardware Timers

Hardware timing is provided by the 6596 chip. This chip provides several timers, all of which can be operated in one-shot and multi-shot modes. The 6596 also provides random number generation in hardware.

### Ports

<table>
  <thead>
    <tr>
      <th style="text-align:left">Port</th>
      <th style="text-align:left">Name</th>
      <th style="text-align:left">Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">0x00</td>
      <td style="text-align:left">RTC: Hours</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left">0x01</td>
      <td style="text-align:left">RTC: Minutes</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left">0x02</td>
      <td style="text-align:left">RTC: Seconds</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left">0x03</td>
      <td style="text-align:left">RTC: Hundredths</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left">0x04</td>
      <td style="text-align:left">Timer 0 High</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left">0x05</td>
      <td style="text-align:left">Timer 0 Low</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left">0x06</td>
      <td style="text-align:left">Timer 1 High</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left">0x07</td>
      <td style="text-align:left">Timer 1 Low</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left">0x08</td>
      <td style="text-align:left">Timer 2 High</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left">0x09</td>
      <td style="text-align:left">Timer 2 Low</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left">0x0A</td>
      <td style="text-align:left">Timer 3 High</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left">0x0B</td>
      <td style="text-align:left">Timer 3 Low</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left">0x0C</td>
      <td style="text-align:left">Random High</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left">0x0D</td>
      <td style="text-align:left">Random Low</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left">0x0E</td>
      <td style="text-align:left">Timer Modes</td>
      <td style="text-align:left">
        <p><code>33221100</code> 
        </p>
        <p></p>
        <p><code>00</code> &#x2013; Disabled (default)</p>
        <p><code>01</code> &#x2013; One-shot</p>
        <p><code>10</code> &#x2013; Multi-shot</p>
        <p><code>11</code> &#x2013; Random</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">0x0F</td>
      <td style="text-align:left">Reset</td>
      <td style="text-align:left"></td>
    </tr>
  </tbody>
</table>

### 

