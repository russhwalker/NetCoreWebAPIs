﻿using System;
using System.Collections.Generic;
using System.Text;

namespace NetCoreWebAPIs.Core.Models
{
    public class Customer
    {
        public int CustomerId { get; set; }

        public string CustomerName { get; set; }

        public List<Order> Orders { get; set; }
    }
}