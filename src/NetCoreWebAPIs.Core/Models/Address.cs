﻿using System;
using System.Collections.Generic;
using System.Text;

namespace NetCoreWebAPIs.Core.Models
{
    public class Address
    {
        public int AddressId { get; set; }
        public int CustomerId { get; set; }
        public string Street { get; set; }

        public string City { get; set; }

        public string State { get; set; }

        public string Zip { get; set; }
    }
}