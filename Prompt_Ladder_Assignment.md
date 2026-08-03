# Assignment: The Prompt Ladder
**Track:** General AI Fluency (Week 2)  
**Intern:** Vrishin Ram K  

---

## Why it matters
The gap between a lazy prompt and an engineered one is the cheapest performance upgrade in AI. This assignment demonstrates the disciplined approach of changing exactly one layer at a time, testing the output at every step, and capturing what improved, what failed, and what to try next.

---

## Baseline: The Lazy Prompt

### The Prompt
```text
Write a python script to scan ports
```

### The Output (Excerpt / Code)
```python
import socket

target = "127.0.0.1"

for port in range(1, 1025):
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.settimeout(1)
    result = s.connect_ex((target, port))
    if result == 0:
        print(f"Port {port} is open")
    s.close()
```

### Observations
* **What changed in prompt:** None (This is the baseline).
* **What actually improved in output:** None.
* **What still failed:** The script is extremely slow because it is single-threaded. It takes over 17 minutes to scan 1024 ports. It also has a hardcoded target IP and no error handling.
* **What to try next:** Add concurrency/multi-threading to speed it up (Clearer Goal).

---

## Version 1: Adding a Clearer Goal

### The Prompt
```text
Write a Python script to scan ports 1-1024 on a given target IP address. It must run efficiently and scan all ports in under 10 seconds.
```

### The Output (Excerpt / Code)
```python
import socket
import threading
from concurrent.futures import ThreadPoolExecutor

target = "127.0.0.1"

def scan_port(port):
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.settimeout(0.5)
    result = s.connect_ex((target, port))
    if result == 0:
        print(f"Port {port} is open")
    else:
        print(f"Port {port} is closed")
    s.close()

with ThreadPoolExecutor(max_workers=100) as executor:
    executor.map(scan_port, range(1, 1025))
```

### Observations
* **What changed in prompt:** Added a clearer goal: a specific port range (1-1024) and an efficiency requirement (scan in under 10 seconds).
* **What actually improved in output:** The script uses `ThreadPoolExecutor` with 100 workers, reducing the scan time from minutes to under 5 seconds.
* **What still failed:** The terminal is flooded with hundreds of "Port X is closed" messages, making it impossible to quickly see the open ports.
* **What to try next:** Format the output to only display positive results (Constraints).

---

## Version 2: Adding Constraints

### The Prompt
```text
Write a Python script to scan ports 1-1024 on a given target IP address. It must run efficiently (under 10 seconds). Constraint: ONLY print output for ports that are open. Do not print anything for closed ports.
```

### The Output (Excerpt / Code)
```python
import socket
from concurrent.futures import ThreadPoolExecutor

target = "127.0.0.1"

def scan_port(port):
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.settimeout(0.5)
    result = s.connect_ex((target, port))
    if result == 0:
        print(f"Port {port} is open")
    s.close()

with ThreadPoolExecutor(max_workers=100) as executor:
    executor.map(scan_port, range(1, 1025))
```

### Observations
* **What changed in prompt:** Added a strict output constraint: do not print anything for closed ports, only print open ports.
* **What actually improved in output:** The terminal clutter is gone. The output is clean and only lists the ports that are active.
* **What still failed:** The output is just plain text lines. It doesn't indicate what services are running on those ports, making it less useful for security analysis.
* **What to try next:** Request a structured format like a table and include service resolution (Output Format).

---

## Version 3: Adding Specified Output Format (The "Broke" / Worse Moment)

### The Prompt
```text
Write a Python script to scan ports 1-1024 on a given target IP address. It must run efficiently (under 10 seconds). Constraint: ONLY print output for ports that are open. Output Format: Print the open ports in a neat markdown table with columns: Port, Service, and Status (e.g. Open).
```

### The Output (Excerpt / Code)
```python
import socket
from concurrent.futures import ThreadPoolExecutor
from prettytable import PrettyTable  # <--- External dependency

target = "127.0.0.1"
table = PrettyTable()
table.field_names = ["Port", "Service", "Status"]

def scan_port(port):
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.settimeout(0.5)
    result = s.connect_ex((target, port))
    if result == 0:
        try:
            service = socket.getservbyport(port)
        except:
            service = "unknown"
        table.add_row([port, service, "Open"])
    s.close()

# ... Threading logic and printing table ...
```

### Observations
* **What changed in prompt:** Specified the output format (markdown table with Port, Service, Status columns).
* **What actually improved in output:** The script attempts to resolve service names using `socket.getservbyport()` and organize them.
* **What still failed (This made it worse!):** The model imported the external library `prettytable` to generate the table. Since `prettytable` is not a Python standard library, the script fails with a `ModuleNotFoundError` on standard systems. This broke usability.
* **What to try next:** Add a constraint to use ONLY standard library packages and define the audience/context (Context & Audience).

---

## Version 4: Adding Context & Audience

### The Prompt
```text
Write a Python script to scan ports 1-1024 on a target IP address. It must run efficiently. Constraint: ONLY print output for ports that are open. Output Format: Print a markdown table with columns: Port, Service, Status.
Audience Context: This script is for a junior SOC analyst running scans on restricted-access investigation machines where installing external pip packages (like prettytable or tabulate) is strictly blocked. Use ONLY Python standard library modules.
```

### The Output (Excerpt / Code)
```python
import socket
import threading
from concurrent.futures import ThreadPoolExecutor

target = "127.0.0.1"
open_ports = []
lock = threading.Lock()

def scan_port(port):
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.settimeout(0.5)
    result = s.connect_ex((target, port))
    if result == 0:
        try:
            service = socket.getservbyport(port, "tcp")
        except:
            service = "unknown"
        with lock:
            open_ports.append((port, service))
    s.close()

with ThreadPoolExecutor(max_workers=100) as executor:
    executor.map(scan_port, range(1, 1025))

# Manually format markdown table using standard library string formatting
print("| Port | Service | Status |")
print("|------|---------|--------|")
for port, service in sorted(open_ports):
    print(f"| {port} | {service} | Open |")
```

### Observations
* **What changed in prompt:** Added real-world context and target audience (restricted-access environment, no external pip packages).
* **What actually improved in output:** The model stopped using external modules and manually formatted the markdown table using standard Python string concatenation. The threading is properly locked to prevent race conditions during list appends.
* **What still failed:** The target IP is still hardcoded inside the script, meaning the user has to edit the file to scan a different target.
* **What to try next:** Add command-line arguments and input validation (Verification Requirements).

---

## Version 5: Adding Verification Requirements (Final Best Prompt)

### The Prompt
```text
Write a Python script to scan ports 1-1024 on a target IP address. 
Constraints:
- It must run efficiently (under 10 seconds) using multi-threading.
- Use ONLY the Python standard library.
- ONLY print output for open ports.
- Format output as a markdown table with columns: Port, Service, Status.
Audience: A junior SOC analyst on restricted-access investigation systems.
Verification & Input Requirements:
- The target host must be passed as a command-line argument (e.g. python scanner.py 192.168.1.1).
- The script must verify that the argument is present. If missing, it must print a clean, helpful usage guide and exit with code 1.
- Handle potential errors like invalid hostname resolutions gracefully.
```

### The Output (Excerpt / Code)
```python
import sys
import socket
import threading
from concurrent.futures import ThreadPoolExecutor

def print_usage():
    print("Port Scanner - Standard Library Edition")
    print("Usage:")
    print("  python scanner.py <target-ip-or-host>")
    print("\nExample:")
    print("  python scanner.py 192.168.1.1")

def main():
    if len(sys.argv) < 2:
        print_usage()
        sys.exit(1)
        
    target_host = sys.argv[1]
    
    try:
        target_ip = socket.gethostbyname(target_host)
        print(f"Starting scan on {target_host} ({target_ip})...\n")
    except socket.gaierror:
        print(f"Error: Could not resolve hostname '{target_host}'.")
        sys.exit(1)

    open_ports = []
    lock = threading.Lock()

    def scan_port(port):
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.settimeout(0.5)
        result = s.connect_ex((target_ip, port))
        if result == 0:
            try:
                service = socket.getservbyport(port, "tcp")
            except:
                service = "unknown"
            with lock:
                open_ports.append((port, service))
        s.close()

    # Scan ports 1 to 1024
    with ThreadPoolExecutor(max_workers=100) as executor:
        executor.map(scan_port, range(1, 1025))

    # Display results
    if open_ports:
        print("| Port | Service | Status |")
        print("|------|---------|--------|")
        for port, service in sorted(open_ports):
            print(f"| {port:<4} | {service:<7} | Open   |")
    else:
        print("No open ports found in range 1-1024.")

if __name__ == "__main__":
    main()
```

### Observations
* **What changed in prompt:** Added command-line parameter requirements, validation checks, graceful crash handling, and target resolution.
* **What actually improved in output:** The script is now a production-ready command line utility. It resolves hostnames to IPs, checks if the target argument is provided, falls back to a neat help menu, and handles offline/invalid hosts gracefully without throwing traceback dumps.
* **What still failed:** None. The script is highly functional, self-contained, and perfectly suited for the target audience.
* **What to try next:** No further improvements needed for this assignment's scope.

---

## Final Reusable Prompt
Here is the clean, final prompt that can be used out-of-the-box by any analyst or developer:

```text
Write a Python script to scan ports 1-1024 on a target IP address. 

Constraints:
- It must run efficiently (under 10 seconds) using multi-threading.
- Use ONLY the Python standard library.
- ONLY print output for open ports.
- Format output as a markdown table with columns: Port, Service, Status.

Audience: A junior SOC analyst on restricted-access investigation systems.

Verification & Input Requirements:
- The target host must be passed as a command-line argument (e.g. python scanner.py 192.168.1.1).
- The script must verify that the argument is present. If missing, it must print a clean, helpful usage guide and exit with code 1.
- Handle potential errors like invalid hostname resolutions gracefully.
```
