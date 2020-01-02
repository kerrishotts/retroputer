# Hardware Timers

Hardware timing is provided by the 6596 chip. This chip provides several timers, all of which can be operated in one-shot and multi-shot modes. The 6596 also provides random number generation in hardware.

### Ports

<table>
  <thead>
    <tr>
      <th >Port</th>
      <th >Name</th>
      <th >Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td >0x00</td>
      <td >RTC: Hours</td>
      <td ></td>
    </tr>
    <tr>
      <td >0x01</td>
      <td >RTC: Minutes</td>
      <td ></td>
    </tr>
    <tr>
      <td >0x02</td>
      <td >RTC: Seconds</td>
      <td ></td>
    </tr>
    <tr>
      <td >0x03</td>
      <td >RTC: Hundredths</td>
      <td ></td>
    </tr>
    <tr>
      <td >0x04</td>
      <td >Timer 0 High</td>
      <td ></td>
    </tr>
    <tr>
      <td >0x05</td>
      <td >Timer 0 Low</td>
      <td ></td>
    </tr>
    <tr>
      <td >0x06</td>
      <td >Timer 1 High</td>
      <td ></td>
    </tr>
    <tr>
      <td >0x07</td>
      <td >Timer 1 Low</td>
      <td ></td>
    </tr>
    <tr>
      <td >0x08</td>
      <td >Timer 2 High</td>
      <td ></td>
    </tr>
    <tr>
      <td >0x09</td>
      <td >Timer 2 Low</td>
      <td ></td>
    </tr>
    <tr>
      <td >0x0A</td>
      <td >Timer 3 High</td>
      <td ></td>
    </tr>
    <tr>
      <td >0x0B</td>
      <td >Timer 3 Low</td>
      <td ></td>
    </tr>
    <tr>
      <td >0x0C</td>
      <td >Random High</td>
      <td ></td>
    </tr>
    <tr>
      <td >0x0D</td>
      <td >Random Low</td>
      <td ></td>
    </tr>
    <tr>
      <td >0x0E</td>
      <td >Timer Modes</td>
      <td >
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
      <td >0x0F</td>
      <td >Reset</td>
      <td ></td>
    </tr>
  </tbody>
</table>

### 

